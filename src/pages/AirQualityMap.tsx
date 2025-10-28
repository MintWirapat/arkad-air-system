import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, RegularShape } from 'ol/style';
import Icon from 'ol/style/Icon';
import Footer from '../components/Footer.tsx';

const AirQualityMap = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const vectorSourceRef = useRef(null);
  const userLocationFeatureRef = useRef(null);

  const airQualityLevels = [
    { label: 'ดีมาก', range: '0-15', color: 'rgb(0,191,243)' },
    { label: 'ดี', range: '16-25', color: 'rgb(0,166,81)' },
    { label: 'ปานกลาง', range: '26-37.5', color: 'rgb(253,192,78)' },
    { label: 'เริ่มมีผลต่อสุขภาพ', range: '37.6-75', color: 'rgb(242,101,34)' },
    { label: 'มีผลต่อสุขภาพ', range: '75+', color: 'rgb(205,0,0)' }
  ];

  const getAirQualityStatus = (pm25) => {
    if (pm25 <= 15.0) return 'คุณภาพอากาศดีมาก';
    if (pm25 <= 25.0) return 'คุณภาพอากาศดี';
    if (pm25 <= 37.5) return 'ปานกลาง';
    if (pm25 <= 75.0) return 'เริ่มมีผลต่อสุขภาพ';
    return 'มีผลต่อสุขภาพ';
  };

  const getColorByPM25 = (pm25) => {
    if (pm25 <= 15.0) return 'rgb(0,191,243)';
    if (pm25 <= 25.0) return 'rgb(0,166,81)';
    if (pm25 <= 37.5) return 'rgb(253,192,78)';
    if (pm25 <= 75.0) return 'rgb(242,101,34)';
    return 'rgb(205,0,0)';
  };

  const createUserLocationMarker = (coordinates) => {
    if (userLocationFeatureRef.current) {
      vectorSourceRef.current.removeFeature(userLocationFeatureRef.current);
    }

    userLocationFeatureRef.current = new Feature({
      geometry: new Point(fromLonLat(coordinates))
    });

    userLocationFeatureRef.current.setStyle([
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: '#2196F3' }),
          stroke: new Stroke({ color: '#fff', width: 3 })
        })
      }),
      new Style({
        image: new RegularShape({
          points: 3,
          radius: 16,
          fill: new Fill({ color: '#2196F3' }),
          stroke: new Stroke({ color: '#fff', width: 3 }),
          rotation: Math.PI,
          displacement: [0, -16]
        })
      })
    ]);

    vectorSourceRef.current.addFeature(userLocationFeatureRef.current);
  };

  const loadStationData = async () => {
    try {
      const apiUrl = 'https://api.arkaddee.com/api/dustboy';
      const response = await fetch(apiUrl);
      const data = await response.json();
      const stations = data[0].stations;

      vectorSourceRef.current.clear();

      stations.forEach(station => {
        if (station.longitude && station.latitude) {
          const feature = new Feature({
            geometry: new Point(fromLonLat([parseFloat(station.longitude), parseFloat(station.latitude)]))
          });

          const color = getColorByPM25(station.pm25);
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const size = 80;
          canvas.width = size;
          canvas.height = size;

          context.beginPath();
          context.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
          context.fillStyle = color;
          context.fill();
          context.strokeStyle = '#fff';
          context.lineWidth = 2;
          context.stroke();

          context.fillStyle = '#000';
          context.font = 'bold 30px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          const pm25Text = Math.round(station.pm25).toString();
          context.fillText(pm25Text, size / 2, size / 2);

          feature.setStyle(new Style({
            image: new Icon({
              img: canvas,
              imgSize: [size, size],
              scale: 0.5
            })
          }));

          feature.set('stationData', station);
          vectorSourceRef.current.addFeature(feature);
        }
      });
    } catch (error) {
      console.error('Error loading station data:', error);
    }
  };

  const goToUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLon = position.coords.longitude;
        const userLat = position.coords.latitude;

        // ซูมเข้าไปที่ตำแหน่งผู้ใช้
        mapInstanceRef.current.getView().animate({
          center: fromLonLat([userLon, userLat]),
          zoom: 15, // ซูมเข้าไปที่ระดับ 15
          duration: 1000
        });

        createUserLocationMarker([userLon, userLat]);
      }, (error) => {
        console.error('เกิดข้อผิดพลาดในการรับตำแหน่ง:', error);
        alert('ไม่สามารถเข้าถึงตำแหน่งของคุณได้ กรุณาอนุญาตการเข้าถึงตำแหน่งในเบราว์เซอร์');
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง');
    }
  };

  useEffect(() => {
    const handleMenuToggle = (event) => {
      console.log('Menu state received:', event.detail?.isOpen);
      setIsMenuOpen(event.detail?.isOpen || false);
    };

    window.addEventListener('menuToggle', handleMenuToggle);

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    vectorSourceRef.current = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current
    });

    // สร้างแผนที่โดยเริ่มต้นที่ประเทศไทย ซูมออก
    mapInstanceRef.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [],
            crossOrigin: 'anonymous'
          })
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([100.5, 13.7]), // ใจกลางประเทศไทย (กรุงเทพฯ)
        zoom: 6, // ซูมออกเพื่อเห็นประเทศไทยทั้งหมด
        minZoom: 5,
        maxZoom: 19
      }),
      controls: []
    });

    const resizeHandler = () => {
      mapInstanceRef.current.updateSize();
    };
    window.addEventListener('resize', resizeHandler);

    // ไม่ต้องซูมเข้าหาตำแหน่งผู้ใช้อัตโนมัติตอนเริ่มต้น
    // ให้รอผู้ใช้กดปุ่มเองแทน

    mapInstanceRef.current.on('click', (event) => {
      const feature = mapInstanceRef.current.forEachFeatureAtPixel(event.pixel, feature => feature);

      if (feature) {
        const stationData = feature.get('stationData');
        if (stationData) {
          setPopupContent(stationData);
          setPopupVisible(true);
        }
      } else {
        setPopupVisible(false);
      }
    });

    loadStationData();
    const interval = setInterval(loadStationData, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('menuToggle', handleMenuToggle);
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('resize', resizeHandler);
      clearInterval(interval);
      mapInstanceRef.current.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div style={styles.container}>
        <div ref={mapRef} style={styles.mapContainer}></div>

        {popupVisible && popupContent && (
          <div style={{ ...styles.popup, backgroundColor: getColorByPM25(popupContent.pm25) }}>
            <div style={styles.stationName}>{popupContent.station_name}</div>
            <div style={styles.pm25Value}>{Math.round(popupContent.pm25)}</div>
            <div style={styles.pm25Label}>PM<sub>2.5</sub> (μg/m³)</div>
            <div style={styles.airQualityStatus}>{getAirQualityStatus(popupContent.pm25)}</div>
          </div>
        )}

        <div style={{ ...styles.dustboyLogo, display: isMenuOpen ? 'none' : 'block' }}>
          <img src={require("../images/cmu-ccdc.png")} width="200px" alt="CMUCCDC" />
        </div>

        <button 
          onClick={goToUserLocation} 
          style={{ ...styles.locationButton, display: isMenuOpen ? 'none' : 'flex' }} 
          title="ไปยังตำแหน่งของฉัน"
        >
          📍
        </button>

        {!isMobile && (
          <div style={styles.legend}>
            <h3 style={styles.legendTitle}>คุณภาพอากาศ</h3>
            {airQualityLevels.map((level, index) => (
              <div key={index} style={styles.legendItem}>
                <div style={{ ...styles.colorBox, backgroundColor: level.color }}></div>
                <span>{level.label} ({level.range})</span>
              </div>
            ))}
          </div>
        )}

        <div style={styles.pm25LevelBar}>
          {[
            { value: '0-15.0', color: 'rgb(0,191,243)', Image: require("../images/DUST_GIRL3.png") },
            { value: '15.1-25.0', color: 'rgb(0,166,81)', Image: require("../images/DUST_GIRL2.png") },
            { value: '25.1-37.5', color: 'rgb(253,192,78)', Image: require("../images/DUST_GIRL.png") },
            { value: '37.6-75.0', color: 'rgb(242,101,34)', Image: require("../images/DUST_GIRL5.png") },
            { value: '>75.0', color: 'rgb(205,0,0)', Image: require("../images/DUST_GIRL4.png") }
          ].map((item, index) => (
            <div key={index} style={{ ...styles.levelItem, backgroundColor: item.color }}>
              <div style={styles.levelValue}>{item.value}</div>
              <img src={item.Image} alt="dust level icon" style={styles.dustboyIcon} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '64px'
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#f5f5f5'
  },
  popup: {
    position: 'absolute',
    top: '20%',
    left: '20px',
    zIndex: 1000,
    padding: '20px',
    borderRadius: '10px',
    minWidth: '250px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '10px'
  },
  stationName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '10px',
    maxWidth: '250px',
    textAlign: 'left'
  },
  pm25Value: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1,
    margin: '10px 0'
  },
  pm25Label: {
    fontSize: '16px',
    color: 'black',
    marginBottom: '10px'
  },
  airQualityStatus: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '8px',
    borderRadius: '20px',
    marginTop: '10px'
  },
  dustboyLogo: {
    position: 'absolute',
    top: '140px',
    right: '10px',
    borderRadius: '5px',
    zIndex: 1000,
    transition: 'opacity 0.3s ease'
  },
  locationButton: {
    position: 'absolute',
    top: '230px',
    right: '20px',
    zIndex: 1000,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  legend: {
    position: 'absolute',
    bottom: '130px',
    right: '20px',
    background: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
  },
  legendTitle: {
    margin: '0 0 10px 0',
    fontSize: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  },
  colorBox: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
    border: '1px solid #ccc'
  },
  pm25LevelBar: {
    position: 'absolute',
    bottom: '0%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#004466',
    padding: '5px 0',
    zIndex: 1000
  },
  levelItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px 20px',
    color: 'black',
    fontWeight: 'bold'
  },
  levelValue: {
    fontSize: '14px'
  },
  dustboyIcon: {
    width: '20px',
    height: '20px'
  },
  copyright: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#004466',
    color: 'white',
    textAlign: 'center',
    padding: '5px 0',
    fontSize: '12px',
    zIndex: 1000
  }
};

export default AirQualityMap;