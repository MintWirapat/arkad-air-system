import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import TimePicker from  '../components/TimePicker.tsx';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DAYS_OF_WEEK = [
  { value: 0, label: 'อาทิตย์' },
  { value: 1, label: 'จันทร์' },
  { value: 2, label: 'อังคาร' },
  { value: 3, label: 'พุธ' },
  { value: 4, label: 'พฤหัสบดี' },
  { value: 5, label: 'ศุกร์' },
  { value: 6, label: 'เสาร์' }
];

const PlaceRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_range: '',
    types: [],
    cuisines: [],
    latitude: 13.7563,
    longitude: 100.5018,
    address: {
      houseNo: '',
      moo: '',
      soi: '',
      subDistrict: '',
      district: '',
      province: '',
      zipCode: '',
      mobile: ''
    },
    images: [],
    hasAirPurifier: false,
    hasAirVentilator: false,
    openingHours: DAYS_OF_WEEK.map(day => ({
      day_of_week: day.value,
      is_open: true,
      open_time: '10:00',
      close_time: '22:00'
    }))
  });

  const [storeTypes, setStoreTypes] = useState([]);
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [addressdata, setAddressData] = useState([]);

  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedSubDistrictId, setSelectedSubDistrictId] = useState('');
  const [zipCode, setZipCode] = useState('');




  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showCuisinePopup, setShowCuisinePopup] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [mapKey, setMapKey] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedTypes = storeTypes.filter(t => formData.types.includes(t.id));
  const typeDropdownRef = useRef(null);
  const cuisineDropdownRef = useRef(null);



  const [selectedCuisines, setSelectedCuisines] = useState([]);






  // ดึงข้อมูลจังหวัดตอนเริ่มต้น
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://api.arkaddee.com/api/addresses/provinces');
        setAddressData(response.data);
        setIsLoading(false);
      } catch (error) {

        console.error('Error fetching provinces:', error);
        setIsLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  const province = addressdata;
  const district = selectedProvinceId?.amphure || [];
  const subdistrict = selectedDistrictId?.tambon || [];



  // ดึงข้อมูลอำเภอเมื่อเลือกจังหวัด
  const handleProvinceChange = async (e) => {
    const provinceId = (e.target.value);
    const provinceName = province.find(p => p.name_th === provinceId);
    setSelectedProvinceId(provinceName);
    setSelectedDistrictId(null);
    setSelectedSubDistrictId(null);

    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        province: provinceId
      }
    }));

  };

  // ดึงข้อมูลตำบลเมื่อเลือกอำเภอ
  const handleDistrictChange = (e) => {
    const districtId = (e.target.value);
    const districtName = district.find(d => d.name_th === districtId);
    setSelectedDistrictId(districtName);
    setSelectedSubDistrictId(null);


    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        district: districtId
      }
    }));



  };

  // เลือกตำบล
  const handleSubDistrictChange = (e) => {
    const subDistrictId = (e.target.value);
    const subDistrictName = subdistrict.find(s => s.name_th === subDistrictId);
    setSelectedSubDistrictId(subDistrictName);

    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        subDistrict: subDistrictId
      }
    }));


    if (subDistrictName?.zip_code) {
      setZipCode(subDistrictName.zip_code);

      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          zipCode: subDistrictName.zip_code
        }
      }));

      // ดึงรหัสไปรษณีย์เมื่อเลือกตำบล
    } else {
      setZipCode('');
    }


  };





  useEffect(() => {
    const fetchTypesAndCuisines = async () => {
      try {
        const [typesRes, cuisinesRes] = await Promise.all([
          axios.get('https://api.arkaddee.com/api/store-types'),
          axios.get('https://api.arkaddee.com/api/cuisines')
        ]);
        setStoreTypes(typesRes.data.data);
        setCuisineTypes(cuisinesRes.data.data);
      } catch (error) {
        console.error('Error fetching types and cuisines:', error);
      }
    };
    fetchTypesAndCuisines();
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setShowTypePopup(false);
      }
      if (cuisineDropdownRef.current && !cuisineDropdownRef.current.contains(event.target)) {
        setShowCuisinePopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleOpeningHourChange = (dayIndex, field, value) => {
    setFormData(prev => {
      const newHours = [...prev.openingHours];
      newHours[dayIndex] = { ...newHours[dayIndex], [field]: value };
      return { ...prev, openingHours: newHours };
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const selectType = (typeId) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter(t => t !== typeId)
        : [...prev.types, typeId]
    }));
    console.log('formData.types after setFormData:', typeId);
    console.log('cuisineTypes:', cuisineTypes);




  };


  const selectCuisine = (cuisineId) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisineId)
        ? prev.cuisines.filter(c => c !== cuisineId)
        : [...prev.cuisines, cuisineId]
    }));
  };

  const removeType = (typeId) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.filter(t => t !== typeId),
      cuisines: prev.cuisines.filter(c => {
        const cuisine = cuisineTypes.find(ct => ct.id === c);
        const removedType = storeTypes.find(st => st.id === typeId);
        return cuisine?.category !== removedType?.category;
      })
    }));
  };

  const removeCuisine = (cuisineId) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.filter(c => c !== cuisineId)
    }));
  };

  const getFilteredCuisines = () => {
    if (formData.types.length === 0) return [];
    const categories = formData.types.map(typeId => {
      const selectedcuis = cuisineTypes.filter(c => {
        return c.store_type_id === typeId;
      });
      return selectedcuis;
    });
    console.log('Filtered Cuisines:', categories.flat());
    return categories.flat();
  };

  const updateMap = (lat, lon) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lon
    }));
    setMapKey(k => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setPopupMessage('กรุณากรอกชื่อสถานที่');
      setShowPopup(true);
      return;
    }
    if (!formData.description) {
      setPopupMessage('กรุณากรอกรายละเอียดร้านค้า');
      setShowPopup(true);
      return;
    }
    if (!formData.price_range) {
      setPopupMessage('กรุณากรอกช่วงราคา');
      setShowPopup(true);
      return;
    }
    if (formData.types.length === 0) {
      setPopupMessage('กรุณาเลือกหมวดหมู่สถานที่');
      setShowPopup(true);
      return;
    }
    // ตรวจสอบข้อมูลที่อยู่ร้านค้า
    if (!formData.address.houseNo) {
      setPopupMessage('กรุณากรอกบ้านเลขที่');
      setShowPopup(true);
      return;
    }
    if (!formData.address.province) {
      setPopupMessage('กรุณาเลือกจังหวัด');
      setShowPopup(true);
      return;
    }
    if (!formData.address.district) {
      setPopupMessage('กรุณาเลือกอำเภอ/เขต');
      setShowPopup(true);
      return;
    }
    if (!formData.address.subDistrict) {
      setPopupMessage('กรุณาเลือกตำบล/แขวง');
      setShowPopup(true);
      return;
    }
    if (!formData.address.zipCode) {
      setPopupMessage('กรุณากรอกรหัสไปรษณีย์');
      setShowPopup(true);
      return;
    }
    if (!formData.address.mobile) {
      setPopupMessage('กรุณากรอกเบอร์โทร');
      setShowPopup(true);
      return;
    }


    setIsLoading(true);
    try {
      let imageUrls = [];

      if (formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          try {
            const uploadResponse = await axios.post('https://api.arkaddee.com/api/upload/image', {
              image: formData.images[i]
            }, { headers: { ' Content-Type': 'multipart/form-data' } });

            const responseText = await uploadResponse.data;

            if (responseText.status !== 'success') {
              throw new Error(`ไม่สามารถอัพโหลดรูปภาพที่ ${i + 1} ได้: ${uploadResponse.statusText}`);
            }

            const uploadResult = responseText.data;
            const imageUrl = uploadResult.url || uploadResult.imageUrl || uploadResult.data?.url || uploadResult.path;

            if (!imageUrl) {
              throw new Error(`ไม่พบ URL รูปภาพที่ ${i + 1} ใน response`);
            }

            imageUrls.push(imageUrl);

          } catch (uploadError) {
            console.error(`Error uploading image ${i + 1}:`, uploadError);
            throw new Error(`ไม่สามารถอัพโหลดรูปภาพที่ ${i + 1} ได้: ${uploadError.message}`);
          }
        }
      }

      const storeData = {
        name: formData.name,
        description: formData.description,
        price_range: formData.price_range,
        types: formData.types,
        cuisines: formData.cuisines,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        images: imageUrls,
        hasAirPurifier: formData.hasAirPurifier,
        hasAirVentilator: formData.hasAirVentilator,
        openingHours: formData.openingHours
      };
      console.log('Store Data to submit:', storeData);
      const response = await fetch('https://api.arkaddee.com/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }

      const result = await response.json();
      setPopupMessage('บันทึกข้อมูลสำเร็จ! ✓');
      setShowPopup(true);

    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      setPopupMessage(errorMsg);
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        updateMap(e.latlng.lat, e.latlng.lng);
      }
    });
    return null;
  };

  return (
    <div style={{ ...styles.container, paddingTop: '3rem' }} >
      <div style={styles.header}>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          ลงทะเบียนร้านค้า
        </h1>
      </div>

      {showPopup && (
        <div style={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.popupMessage}>{popupMessage}</div>
            <button
              onClick={() => setShowPopup(false)}
              style={styles.popupButton}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}

      <div style={styles.form}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ข้อมูลพื้นฐาน</h2>

          {/* ชื่อสถานที่/ร้านค้า */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              ชื่อสถานที่/ร้านค้า <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ชื่อสถานที่/ร้านค้า"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
            />
          </div>

          {/* รายละเอียดร้านค้า */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">รายละเอียดร้านค้า <span style={{ color: 'red' }}>*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="รายละเอียดร้านค้า"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 resize-none placeholder-gray-300 text-sm md:text-base"
              style={{ minHeight: '80px' }}
              rows="3"
            />
          </div>

          {/* ช่วงราคา */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">ช่วงราคา <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="price_range"
              value={formData.price_range}
              onChange={handleInputChange}
              placeholder="เช่น ฿-฿฿฿ หรือ 100-300 บาท"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
            />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>เวลาเปิด-ปิด</h2>

          {/* แสดงแบบตารางสำหรับ Desktop */}
          <div className="hidden md:block">
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid #ffffffff',
                  backgroundColor: '#ffffffff'
                }}>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '500',
                    color: '#323233'
                  }}>วัน</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#323233'
                  }}>เวลาเปิด</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#323233'
                  }}>เวลาปิด</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#323233'
                  }}>เปิดทำการ</th>
                </tr>
              </thead>
              <tbody>
                {formData.openingHours.map((hour, idx) => {
                  const day = DAYS_OF_WEEK.find(d => d.value === hour.day_of_week);
                  return (
                    <tr key={idx} style={{
                      borderBottom: '1px solid #e5e5e5'
                    }}>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#323233'
                      }}>{day.label}</td>

                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'center'
                      }}>
                        <TimePicker
                          value={hour.open_time}
                          onChange={(time) => handleOpeningHourChange(idx, 'open_time', time)}
                          disabled={!hour.is_open}
                        />
                      </td>

                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'center'
                      }}>
                        <TimePicker
                          value={hour.close_time}
                          onChange={(time) => handleOpeningHourChange(idx, 'close_time', time)}
                          disabled={!hour.is_open}
                        />
                      </td>

                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'center'
                      }}>
                        <input
                          type="checkbox"
                          checked={hour.is_open}
                          onChange={(e) => handleOpeningHourChange(idx, 'is_open', e.target.checked)}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer'
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* แสดงแบบการ์ดสำหรับ Mobile */}
          <div className="block md:hidden">
            {formData.openingHours.map((hour, idx) => {
              const day = DAYS_OF_WEEK.find(d => d.value === hour.day_of_week);
              return (
                <div key={idx} style={{
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#323233'
                    }}>{day.label}</span>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      color: '#646566'
                    }}>
                      <input
                        type="checkbox"
                        checked={hour.is_open}
                        onChange={(e) => handleOpeningHourChange(idx, 'is_open', e.target.checked)}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer'
                        }}
                      />
                      เปิดทำการ
                    </label>
                  </div>

                  {hour.is_open ? (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '12px',
                          color: '#646566',
                          marginBottom: '6px'
                        }}>เวลาเปิด</label>
                        <TimePicker
                          value={hour.open_time}
                          onChange={(time) => handleOpeningHourChange(idx, 'open_time', time)}
                          disabled={false}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '12px',
                          color: '#646566',
                          marginBottom: '6px'
                        }}>เวลาปิด</label>
                        <TimePicker
                          value={hour.close_time}
                          onChange={(time) => handleOpeningHourChange(idx, 'close_time', time)}
                          disabled={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '12px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      fontSize: '13px',
                      color: '#969799'
                    }}>
                      ปิดทำการ
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>หมวดหมู่สถานที่ และรายละเอียดสถานที่</h2>

          <div style={styles.formGroup}>
            <label style={{ ...styles.label, textAlign: 'left' }}>หมวดหมู่สถานที่  <span style={{ color: 'red' }}>*</span></label>
            <div style={styles.selectWrapper} ref={typeDropdownRef}>
              <button
                type="button"
                onClick={() => setShowTypePopup(!showTypePopup)}
                style={styles.selectButton}
              >
                เลือกหมวดหมู่สถานที่
              </button>
              <div style={styles.tagContainer}>
                {selectedTypes.map(type => (
                  <span key={type.id} style={styles.tag}>
                    {type.name}
                    <button
                      type="button"
                      onClick={() => removeType(type.id)}
                      style={styles.tagClose}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {showTypePopup && (
                <div style={styles.dropdownMenu}>
                  {storeTypes.map(type => (
                    <div
                      key={type.id}
                      onClick={() => selectType(type.id)}
                      style={{
                        ...styles.dropdownItem,
                        backgroundColor: formData.types.includes(type.id) ? '#e6f7ff' : 'white'
                      }}
                    >
                      <div style={styles.dropdownItemContent}>
                        <span>{type.name}</span>
                        {formData.types.includes(type.id) && (
                          <span style={styles.checkmark}>✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedTypes.length > 0 && getFilteredCuisines().length > 0 && (
            <div style={styles.formGroup}>
              <label style={styles.label}>รายละเอียดสถานที่</label>
              <div style={styles.selectWrapper} ref={cuisineDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCuisinePopup(!showCuisinePopup)}
                  style={styles.selectButton}
                >
                  เลือกรายละเอียดสถานที่
                </button>
                <div style={styles.tagContainer}>
                  {selectedCuisines.map(cuisine => (
                    <span key={cuisine.id} style={styles.tag}>
                      {cuisine.name}
                      <button
                        type="button"
                        onClick={() => removeCuisine(cuisine.id)}
                        style={styles.tagClose}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {showCuisinePopup && (
                  <div style={styles.dropdownMenu}>
                    {getFilteredCuisines().map(cuisine => (
                      <div
                        key={cuisine.id}
                        onClick={() => selectCuisine(cuisine.id)}
                        style={{
                          ...styles.dropdownItem,
                          backgroundColor: formData.cuisines.includes(cuisine.id) ? '#e6f7ff' : 'white'
                        }}
                      >
                        <div style={styles.dropdownItemContent}>
                          <span>{cuisine.name}</span>
                          {formData.cuisines.includes(cuisine.id) && (
                            <span style={styles.checkmark}>✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ตำแหน่งที่ตั้ง</h2>

          {/* ช่องค้นหาขนาดใหญ่ */}
          <div style={{
            position: 'relative',
            marginBottom: '12px',
            width: '100%'
          }}>
            <span style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
              fontSize: '22px',
              pointerEvents: 'none',
              zIndex: 1
            }}>🔍</span>

            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="ค้นหาสถานที่หรือวาง URL"
              style={{
                ...styles.input,
                width: '100%',
                fontSize: '18px',  // ใหญ่ขึ้น
                padding: '18px 50px',  // สูงขึ้นเยอะ
                borderRadius: '12px',
                border: '2px solid #ddd',
                outline: 'none',
                boxSizing: 'border-box',
                minHeight: '56px'  // กำหนดความสูงขั้นต่ำ
              }}
            />

            {searchLocation && (
              <button
                onClick={() => setSearchLocation('')}
                type="button"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#999',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',  // ใหญ่ขึ้น
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#fff',
                  padding: 0,
                  zIndex: 1
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* ปุ่มค้นหาและตำแหน่งปัจจุบัน */}
          <div style={styles.searchRow}>
            <button
              type="button"
              onClick={async () => {
                if (!searchLocation.trim()) return alert("กรุณากรอกชื่อสถานที่หรือวางลิงก์");
                const regex = /@([-.\d]+),([-.\d]+)/;
                const match = searchLocation.match(regex);

                if (match) {
                  const lat = parseFloat(match[1]);
                  const lng = parseFloat(match[2]);
                  setFormData({ ...formData, latitude: lat, longitude: lng });
                  setMapKey(Date.now());
                } else {
                  try {
                    const res = await axios.get(
                      `https://nominatim.openstreetmap.org/search`,
                      {
                        params: {
                          format: 'json',
                          q: searchLocation
                        }
                      }
                    );

                    if (res.data.length > 0) {
                      const { lat, lon } = res.data[0];
                      setFormData({ ...formData, latitude: parseFloat(lat), longitude: parseFloat(lon) });
                      setMapKey(Date.now());
                    } else {
                      alert("ไม่พบสถานที่ที่ค้นหา");
                    }
                  } catch (err) {
                    console.error('Search error:', err);
                    alert("เกิดข้อผิดพลาดในการค้นหาสถานที่");
                  }
                }
              }}
              style={{
                ...styles.locationButton,
                fontSize: '16px',
                padding: '14px 20px',
                minHeight: '50px'
              }}
            >
              🔍 ค้นหาสถานที่
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      const lat = pos.coords.latitude;
                      const lng = pos.coords.longitude;
                      setFormData({ ...formData, latitude: lat, longitude: lng });
                      setMapKey(Date.now());
                    },
                    (err) => {
                      alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้: " + err.message);
                    }
                  );
                } else {
                  alert("เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง (Geolocation)");
                }
              }}
              style={{
                ...styles.locationButton,
                fontSize: '16px',
                padding: '14px 20px',
                minHeight: '50px'
              }}
            >
              📍 ตำแหน่งปัจจุบัน
            </button>
          </div>

          <div style={styles.mapWrapper} key={mapKey}>
            <MapContainer
              center={[formData.latitude, formData.longitude]}
              zoom={15}
              style={styles.map}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <Marker position={[formData.latitude, formData.longitude]} />
              <MapClickHandler />
            </MapContainer>
          </div>

          <div style={styles.coordRow}>

            <div style={styles.formGroup}>
              <label style={{ ...styles.label, textAlign: 'left' }}>ละติจูด</label>
              <input
                type="text"
                value={formData.latitude.toFixed(6)}
                readOnly
                style={{
                  ...styles.input,
                  backgroundColor: "#f5f5f5",
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, textAlign: 'left' }}>ลองจิจูด</label>
              <input
                type="text"
                value={formData.longitude.toFixed(6)}
                readOnly
                style={{
                  ...styles.input,
                  backgroundColor: "#f5f5f5",
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>

          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ที่อยู่ร้านค้า</h2>

          {/* บ้านเลขที่ */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              บ้านเลขที่ <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="address.houseNo"
              value={formData.address.houseNo}
              onChange={handleInputChange}
              placeholder="กรุณากรอกบ้านเลขที่"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
            />
          </div>

          {/* หมู่ที่ */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">หมู่ที่</label>
            <input
              type="text"
              name="address.moo"
              value={formData.address.moo}
              onChange={handleInputChange}
              placeholder="กรุณากรอกหมู่ที่"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
            />
          </div>

          {/* ซอย */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">ซอย</label>
            <input
              type="text"
              name="address.soi"
              value={formData.address.soi}
              onChange={handleInputChange}
              placeholder="กรุณากรอกซอย"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
            />
          </div>

          {/* จังหวัด */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              จังหวัด <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              value={selectedProvinceId?.name_th || ''}
              onChange={handleProvinceChange}
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base bg-transparent"
            >
              <option value="">เลือกจังหวัด</option>
              {province.map((province) => (
                <option key={province.id} value={province.name_th}>
                  {province.name_th}
                </option>
              ))}
            </select>
          </div>

          {/* อำเภอ/เขต */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              อำเภอ/เขต <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              value={selectedDistrictId?.name_th || ''}
              onChange={handleDistrictChange}
              disabled={!selectedProvinceId}
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base bg-transparent disabled:opacity-50"
            >
              <option value="">เลือกอำเภอ/เขต</option>
              {district.map((district) => (
                <option key={district.id} value={district.name_th}>
                  {district.name_th}
                </option>
              ))}
            </select>
          </div>

          {/* ตำบล/แขวง */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              ตำบล/แขวง <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              value={selectedSubDistrictId?.name_th || ''}
              onChange={handleSubDistrictChange}
              disabled={!selectedDistrictId}
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base bg-transparent disabled:opacity-50"
            >
              <option value="">เลือกตำบล/แขวง</option>
              {subdistrict.map((subdistrict) => (
                <option key={subdistrict.id} value={subdistrict.name_th}>
                  {subdistrict.name_th}
                </option>
              ))}
            </select>
          </div>

          {/* รหัสไปรษณีย์ */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              รหัสไปรษณีย์ <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="address.zipCode"
              value={zipCode}
              readOnly
              placeholder="รหัสไปรษณีย์จะถูกกรอกอัตโนมัติ"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base bg-gray-50"
            />
          </div>

          {/* เบอร์โทร */}
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center mb-6 md:mb-8">
            <label className="text-sm md:text-base text-gray-900 text-left">
              เบอร์โทร <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="tel"
              name="address.mobile"
              value={formData.address.mobile}
              onChange={handleInputChange}
              placeholder="กรุณากรอกเบอร์โทร"
              className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
            />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>รูปภาพและอุปกรณ์</h2>

          <div style={styles.formGroup}>
            <label style={{ ...styles.label, textAlign: 'left' }}>รูปภาพร้านค้า </label>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                const combinedFiles = [...formData.images, ...newFiles];

                if (combinedFiles.length > 5) {
                  alert(`สามารถอัพโหลดได้สูงสุด 5 รูปเท่านั้น (คุณมีรูปอยู่แล้ว ${formData.images.length} รูป)`);
                  e.target.value = "";
                  return;
                }

                const maxSize = 5 * 1024 * 1024;
                const oversizedFiles = newFiles.filter(file => file.size > maxSize);

                if (oversizedFiles.length > 0) {
                  alert("มีไฟล์ที่มีขนาดเกิน 5MB กรุณาเลือกไฟล์ใหม่");
                  e.target.value = "";
                  return;
                }

                const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
                const combinedPreviews = [...previewImages, ...newPreviews];

                setFormData((prev) => ({
                  ...prev,
                  images: combinedFiles,
                }));

                setPreviewImages(combinedPreviews);
                e.target.value = "";
              }}
              style={styles.fileInput}
            />
            <p style={styles.hint}>อัพโหลดได้สูงสุด 5 รูป (รูปละไม่เกิน 5MB)</p>

            {previewImages.length > 0 && (
              <p style={styles.hint}>เลือกแล้ว {previewImages.length} รูป</p>
            )}

            {previewImages && previewImages.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {previewImages.map((src, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        const newPreviews = previewImages.filter((_, i) => i !== index);

                        URL.revokeObjectURL(src);

                        setFormData((prev) => ({
                          ...prev,
                          images: newImages,
                        }));

                        setPreviewImages(newPreviews);
                      }}
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="hasAirPurifier"
                checked={formData.hasAirPurifier}
                onChange={handleCheckboxChange}
                style={styles.checkbox}
              />
              เครื่องฟอกอากาศ
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="hasAirVentilator"
                checked={formData.hasAirVentilator}
                onChange={handleCheckboxChange}
                style={styles.checkbox}
              />
              เครื่องเติมอากาศ
            </label>
          </div>

          <button onClick={handleSubmit} style={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: "'Noto Sans Thai', sans-serif"
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingTop: '80px',
    paddingBottom: '10px'

  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#323233',
    margin: 0,
    padding: '10px 0'
  },
  form: {
    width: '100%'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e0e0e0'  // เพิ่มบรรทัดนี้
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#323233',
    marginTop: 0,
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #f0f0f0'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#323233'
  },
  smallLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#323233',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  hoursGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px'
  },
  dayCard: {
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: '#fafafa'
  },
  dayName: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '10px',
    color: '#323233'
  },
  dayHourRow: {
    marginBottom: '8px'
  },
  timeInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  timeInput: {
    width: '100%',
    padding: '8px 10px',
    fontSize: '13px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  closedLabel: {
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#969799',
    fontWeight: '500'
  },
  selectWrapper: {
    position: 'relative'
  },
  selectButton: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    textAlign: 'left'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    marginTop: '4px',
    zIndex: 2000,
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  dropdownItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.2s'
  },
  dropdownItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkmark: {
    color: '#1989fa',
    fontWeight: 'bold'
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px'
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#1989fa',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px'
  },
  tagClose: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    padding: 0
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    cursor: 'pointer',
    fontSize: '14px',
    gap: '8px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  searchRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px'
  },
  locationButton: {
    padding: '10px 16px',
    backgroundColor: '#1989fa',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap'
  },
  mapWrapper: {
    marginBottom: '16px',
    borderRadius: '6px',
    overflow: 'hidden',
    height: '400px'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  coordRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  addressGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  fileInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    boxSizing: 'border-box'
  },
  hint: {
    fontSize: '12px',
    color: '#969799',
    marginTop: '8px',
    margin: '8px 0 0 0'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#1989fa',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '20px',
    opacity: 1
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  popupContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    textAlign: 'center'
  },
  popupMessage: {
    fontSize: '16px',
    color: '#323233',
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  popupButton: {
    padding: '10px 30px',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#1989fa',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '100px'
  }
};

export default PlaceRegistration;