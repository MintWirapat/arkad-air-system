import React, { useState, useRef, useEffect } from 'react';

const TimePicker = ({ value, onChange, disabled }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('10');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const pickerRef = useRef(null);
  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);

  // สร้างรายการชั่วโมงและนาที
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // แปลงค่าเวลาที่รับเข้ามา
  useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  }, [value]);

  // Scroll ไปที่ตำแหน่งที่เลือกเมื่อเปิด picker
  useEffect(() => {
    if (showPicker && hourScrollRef.current && minuteScrollRef.current) {
      setTimeout(() => {
        const hourIndex = hours.indexOf(selectedHour);
        const minuteIndex = minutes.indexOf(selectedMinute);
        
        if (hourScrollRef.current) {
          hourScrollRef.current.scrollTop = hourIndex * 40;
        }
        if (minuteScrollRef.current) {
          minuteScrollRef.current.scrollTop = minuteIndex * 40;
        }
      }, 50);
    }
  }, [showPicker, selectedHour, selectedMinute]);

  // ปิด picker เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showPicker]);

  const handleConfirm = () => {
    onChange(`${selectedHour}:${selectedMinute}`);
    setShowPicker(false);
  };

  const handleCancel = () => {
    const [hour, minute] = value.split(':');
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setShowPicker(false);
  };

  const handleScroll = (ref, items, setter) => {
    if (!ref.current) return;
    
    const scrollTop = ref.current.scrollTop;
    const itemHeight = 40;
    const index = Math.round(scrollTop / itemHeight);
    const validIndex = Math.max(0, Math.min(index, items.length - 1));
    
    setter(items[validIndex]);
    
    // Snap to position
    ref.current.scrollTop = validIndex * itemHeight;
  };

  return (
    <div style={styles.container} ref={pickerRef}>
      <button
        type="button"
        onClick={() => !disabled && setShowPicker(true)}
        disabled={disabled}
        style={{
          ...styles.input,
          backgroundColor: disabled ? '#f5f5f5' : 'white',
          color: disabled ? '#969799' : '#323233',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {value || '00:00'}
      </button>

      {showPicker && (
        <>
          <div style={styles.overlay} onClick={() => setShowPicker(false)} />
          <div style={styles.pickerModal}>
            <div style={styles.pickerHeader}>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
              >
                ยกเลิก
              </button>
              <span style={styles.pickerTitle}>เลือกเวลา</span>
              <button
                type="button"
                onClick={handleConfirm}
                style={styles.confirmButton}
              >
                ตกลง
              </button>
            </div>

            <div style={styles.pickerBody}>
              {/* เส้นไฮไลท์ */}
              <div style={styles.highlightBar} />

              {/* Column ชั่วโมง */}
              <div style={styles.columnWrapper}>
                <div
                  ref={hourScrollRef}
                  style={styles.scrollColumn}
                  onScroll={() => handleScroll(hourScrollRef, hours, setSelectedHour)}
                >
                  <div style={styles.spacer} />
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      style={{
                        ...styles.timeItem,
                        color: hour === selectedHour ? '#323233' : '#969799',
                        fontWeight: hour === selectedHour ? '600' : '400',
                        fontSize: hour === selectedHour ? '18px' : '16px'
                      }}
                      onClick={() => {
                        setSelectedHour(hour);
                        const index = hours.indexOf(hour);
                        hourScrollRef.current.scrollTop = index * 40;
                      }}
                    >
                      {hour}
                    </div>
                  ))}
                  <div style={styles.spacer} />
                </div>
                <div style={styles.columnLabel}>ชั่วโมง</div>
              </div>

              {/* เครื่องหมายคั่น */}
              <div style={styles.separator}>:</div>

              {/* Column นาที */}
              <div style={styles.columnWrapper}>
                <div
                  ref={minuteScrollRef}
                  style={styles.scrollColumn}
                  onScroll={() => handleScroll(minuteScrollRef, minutes, setSelectedMinute)}
                >
                  <div style={styles.spacer} />
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      style={{
                        ...styles.timeItem,
                        color: minute === selectedMinute ? '#323233' : '#969799',
                        fontWeight: minute === selectedMinute ? '600' : '400',
                        fontSize: minute === selectedMinute ? '18px' : '16px'
                      }}
                      onClick={() => {
                        setSelectedMinute(minute);
                        const index = minutes.indexOf(minute);
                        minuteScrollRef.current.scrollTop = index * 40;
                      }}
                    >
                      {minute}
                    </div>
                  ))}
                  <div style={styles.spacer} />
                </div>
                <div style={styles.columnLabel}>นาที</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    textAlign: 'center',
    fontFamily: 'inherit'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
    animation: 'fadeIn 0.2s ease'
  },
  pickerModal: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    zIndex: 9999,
    animation: 'slideUp 0.3s ease',
    boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  pickerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #f0f0f0'
  },
  cancelButton: {
    background: 'none',
    border: 'none',
    color: '#969799',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  pickerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#323233'
  },
  confirmButton: {
    background: 'none',
    border: 'none',
    color: '#1989fa',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  pickerBody: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '280px'
  },
  highlightBar: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    right: '20px',
    height: '40px',
    transform: 'translateY(-50%)',
    backgroundColor: '#f7f8fa',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
    pointerEvents: 'none',
    zIndex: 1
  },
  columnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2
  },
  scrollColumn: {
    height: '240px',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    width: '80px',
    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  },
  timeItem: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    scrollSnapAlign: 'center',
    userSelect: 'none'
  },
  spacer: {
    height: '100px'
  },
  separator: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#323233',
    margin: '0 10px',
    paddingBottom: '30px'
  },
  columnLabel: {
    fontSize: '12px',
    color: '#969799',
    marginTop: '8px'
  }
};

// เพิ่ม CSS animations
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `, styleSheet.cssRules.length);
    
    styleSheet.insertRule(`
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore errors in case rules already exist
  }
}

// ซ่อน scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollColumn::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default TimePicker;