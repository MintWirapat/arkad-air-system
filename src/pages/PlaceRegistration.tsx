import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

  const [storeTypes] = useState([
    { id: 1, name: 'ร้านอาหาร' },
    { id: 2, name: 'คาเฟ่' },
    { id: 3, name: 'ห้องเรียน' },
    { id: 4, name: 'สำนักงาน' }
  ]);

  const [cuisineTypes] = useState([
    { id: 1, name: 'ไทย' },
    { id: 2, name: 'จีน' },
    { id: 3, name: 'เวียดนาม' },
    { id: 4, name: 'อิตาลี' }
  ]);

  const [showTypePopup, setShowTypePopup] = useState(false);
  const [showCuisinePopup, setShowCuisinePopup] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [mapKey, setMapKey] = useState(0);
  const [message, setMessage] = useState('');

  const selectedTypes = storeTypes.filter(t => formData.types.includes(t.id));
  const selectedCuisines = cuisineTypes.filter(c => formData.cuisines.includes(c.id));

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

  const toggleType = (typeId) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter(t => t !== typeId)
        : [...prev.types, typeId]
    }));
  };

  const toggleCuisine = (cuisineId) => {
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
      types: prev.types.filter(t => t !== typeId)
    }));
  };

  const removeCuisine = (cuisineId) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.filter(c => c !== cuisineId)
    }));
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMap(latitude, longitude);
          setMessage('พบตำแหน่งปัจจุบันแล้ว');
        },
        (error) => {
          setMessage('ไม่สามารถระบุตำแหน่งปัจจุบันได้');
        }
      );
    }
  };

  const updateMap = (lat, lon) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lon
    }));
    setMapKey(k => k + 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setMessage('อัพโหลดได้สูงสุด 5 รูป');
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('ไฟล์ต้องไม่เกิน 5MB');
        return false;
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setMessage('อนุญาตเฉพาะไฟล์ .jpg หรือ .png เท่านั้น');
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      images: validFiles
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage('กรุณากรอกชื่อสถานที่');
      return;
    }
    if (formData.types.length === 0) {
      setMessage('กรุณาเลือกประเภทร้านค้า');
      return;
    }
    if (!formData.address.houseNo || !formData.address.subDistrict || !formData.address.district || 
        !formData.address.province || !formData.address.zipCode || !formData.address.mobile) {
      setMessage('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน');
      return;
    }
    console.log('Form data:', formData);
    setMessage('บันทึกข้อมูลสำเร็จ');
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>ลงทะเบียนร้านค้า</h1>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
          <button onClick={() => setMessage('')} style={styles.closeMsg}>×</button>
        </div>
      )}

      <div style={styles.form}>
        {/* ข้อมูลพื้นฐาน */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ข้อมูลพื้นฐาน</h2>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>ชื่อสถานที่/ร้านค้า *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="กรุณากรอกชื่อสถานที่"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>รายละเอียดร้านค้า</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="กรุณากรอกรายละเอียดร้านค้า"
              style={{...styles.input, minHeight: '80px'}}
              rows="3"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ช่วงราคา</label>
            <input
              type="text"
              name="price_range"
              value={formData.price_range}
              onChange={handleInputChange}
              placeholder="เช่น ฿-฿฿฿ หรือ 100-300 บาท"
              style={styles.input}
            />
          </div>
        </div>

        {/* เวลาเปิด-ปิด แยกจ-อา */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>เวลาเปิด-ปิดรายวัน</h2>
          
          <div style={styles.hoursGrid}>
            {formData.openingHours.map((hour, idx) => {
              const day = DAYS_OF_WEEK.find(d => d.value === hour.day_of_week);
              return (
                <div key={idx} style={styles.dayCard}>
                  <div style={styles.dayName}>{day.label}</div>
                  
                  <div style={styles.dayHourRow}>
                    <label style={styles.smallLabel}>
                      <input
                        type="checkbox"
                        checked={hour.is_open}
                        onChange={(e) => handleOpeningHourChange(idx, 'is_open', e.target.checked)}
                        style={styles.checkbox}
                      />
                      เปิดวันนี้
                    </label>
                  </div>

                  {hour.is_open && (
                    <div style={styles.timeInputs}>
                      <div>
                        <label style={styles.smallLabel}>เปิด</label>
                        <input
                          type="time"
                          value={hour.open_time}
                          onChange={(e) => handleOpeningHourChange(idx, 'open_time', e.target.value)}
                          style={styles.timeInput}
                        />
                      </div>
                      <div>
                        <label style={styles.smallLabel}>ปิด</label>
                        <input
                          type="time"
                          value={hour.close_time}
                          onChange={(e) => handleOpeningHourChange(idx, 'close_time', e.target.value)}
                          style={styles.timeInput}
                        />
                      </div>
                    </div>
                  )}
                  
                  {!hour.is_open && (
                    <div style={styles.closedLabel}>ปิด</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ประเภทร้านค้าและอาหาร */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ประเภทร้านค้าและอาหาร</h2>

          <div style={styles.formGroup}>
            <label style={styles.label}>ประเภทร้านค้า *</label>
            <button
              type="button"
              onClick={() => setShowTypePopup(!showTypePopup)}
              style={styles.selectButton}
            >
              เลือกประเภทร้านค้า
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
              <div style={styles.popup}>
                {storeTypes.map(type => (
                  <label key={type.id} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.types.includes(type.id)}
                      onChange={() => toggleType(type.id)}
                      style={styles.checkbox}
                    />
                    {type.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ประเภทอาหาร</label>
            <button
              type="button"
              onClick={() => setShowCuisinePopup(!showCuisinePopup)}
              style={styles.selectButton}
            >
              เลือกประเภทอาหาร
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
              <div style={styles.popup}>
                {cuisineTypes.map(cuisine => (
                  <label key={cuisine.id} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.cuisines.includes(cuisine.id)}
                      onChange={() => toggleCuisine(cuisine.id)}
                      style={styles.checkbox}
                    />
                    {cuisine.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ตำแหน่งที่ตั้ง */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ตำแหน่งที่ตั้ง</h2>

          <div style={styles.searchRow}>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="ค้นหาสถานที่"
              style={{...styles.input, flex: 1}}
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              style={styles.locationButton}
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
              <label style={styles.label}>ละติจูด</label>
              <input
                type="text"
                value={formData.latitude.toFixed(4)}
                readOnly
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>ลองจิจูด</label>
              <input
                type="text"
                value={formData.longitude.toFixed(4)}
                readOnly
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* ที่อยู่ร้านค้า */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>ที่อยู่ร้านค้า</h2>

          <div style={styles.addressGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>บ้านเลขที่ *</label>
              <input
                type="text"
                name="address.houseNo"
                value={formData.address.houseNo}
                onChange={handleInputChange}
                placeholder="กรุณากรอกบ้านเลขที่"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>หมู่ที่</label>
              <input
                type="text"
                name="address.moo"
                value={formData.address.moo}
                onChange={handleInputChange}
                placeholder="กรุณากรอกหมู่ที่"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>ซอย</label>
              <input
                type="text"
                name="address.soi"
                value={formData.address.soi}
                onChange={handleInputChange}
                placeholder="กรุณากรอกซอย"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>ตำบล/แขวง *</label>
              <input
                type="text"
                name="address.subDistrict"
                value={formData.address.subDistrict}
                onChange={handleInputChange}
                placeholder="กรุณากรอกตำบล"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>อำเภอ/เขต *</label>
              <input
                type="text"
                name="address.district"
                value={formData.address.district}
                onChange={handleInputChange}
                placeholder="กรุณากรอกอำเภอ"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>จังหวัด *</label>
              <input
                type="text"
                name="address.province"
                value={formData.address.province}
                onChange={handleInputChange}
                placeholder="กรุณากรอกจังหวัด"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>รหัสไปรษณีย์ *</label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                placeholder="xxxxx"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>เบอร์โทร *</label>
              <input
                type="tel"
                name="address.mobile"
                value={formData.address.mobile}
                onChange={handleInputChange}
                placeholder="กรุณากรอกเบอร์โทร"
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* รูปภาพและอุปกรณ์ */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>รูปภาพและอุปกรณ์</h2>

          <div style={styles.formGroup}>
            <label style={styles.label}>รูปภาพร้านค้า</label>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg"
              onChange={handleImageUpload}
              style={styles.fileInput}
            />
            <p style={styles.hint}>อัพโหลดได้สูงสุด 5 รูป (รูปละไม่เกิน 5MB)</p>
            {formData.images.length > 0 && (
              <p style={styles.hint}>เลือกแล้ว {formData.images.length} รูป</p>
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
        </div>

        <button onClick={handleSubmit} style={styles.submitButton}>
          บันทึกข้อมูล
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f7f8fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#323233',
    margin: 0
  },
  message: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeMsg: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: 0
  },
  form: {
    width: '100%'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
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
  selectButton: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    textAlign: 'left'
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
  popup: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    marginTop: '4px',
    zIndex: 1000,
    maxHeight: '200px',
    overflowY: 'auto',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
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
    marginTop: '20px'
  }
};

export default PlaceRegistration;