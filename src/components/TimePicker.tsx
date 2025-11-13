import React, { useRef, useEffect, useState } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, disabled = false }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // สร้างตัวเลือกชั่วโมงและนาที
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(':');
      setSelectedHour(hour || '00');
      setSelectedMinute(minute || '00');
    }
  }, [value]);

  // ปิด picker เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
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

  // Scroll ไปที่ค่าที่เลือกเมื่อเปิด picker
  useEffect(() => {
    if (showPicker) {
      setTimeout(() => {
        if (hourRef.current) {
          const hourIndex = hours.indexOf(selectedHour);
          hourRef.current.scrollTop = hourIndex * 40;
        }
        if (minuteRef.current) {
          const minuteIndex = minutes.indexOf(selectedMinute);
          minuteRef.current.scrollTop = minuteIndex * 40;
        }
      }, 10);
    }
  }, [showPicker, selectedHour, selectedMinute]);

  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
    onChange(`${hour}:${selectedMinute}`);
  };

  const handleSelectMinute = (minute: string) => {
    setSelectedMinute(minute);
    onChange(`${selectedHour}:${minute}`);
  };

  const handleConfirm = () => {
    onChange(`${selectedHour}:${selectedMinute}`);
    setShowPicker(false);
  };

  return (
    <div ref={pickerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Input Display */}
      <button
        type="button"
        onClick={() => !disabled && setShowPicker(!showPicker)}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '14px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          backgroundColor: disabled ? '#f5f5f5' : 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'center',
          color: disabled ? '#969799' : '#323233',
          fontFamily: 'inherit'
        }}
      >
        {value || '00:00'}
      </button>

      {/* Picker Modal */}
      {showPicker && !disabled && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onClick={() => setShowPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: 'white',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '20px',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <style>{`
              @keyframes slideUp {
                from {
                  transform: translateY(100%);
                }
                to {
                  transform: translateY(0);
                }
              }

              .time-column {
                height: 200px;
                overflow-y: auto;
                scroll-snap-type: y mandatory;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
              }

              .time-column::-webkit-scrollbar {
                display: none;
              }

              .time-item {
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                scroll-snap-align: center;
                transition: all 0.2s ease;
                cursor: pointer;
                font-size: 16px;
              }

              .time-item:hover {
                background-color: #f0f0f0;
              }

              .time-item.selected {
                color: #1989fa;
                font-weight: 600;
                font-size: 18px;
              }

              .time-column-wrapper {
                position: relative;
              }

              .time-column-wrapper::before,
              .time-column-wrapper::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                height: 80px;
                pointer-events: none;
                z-index: 1;
              }

              .time-column-wrapper::before {
                top: 0;
                background: linear-gradient(to bottom, white, transparent);
              }

              .time-column-wrapper::after {
                bottom: 0;
                background: linear-gradient(to top, white, transparent);
              }

              .selection-indicator {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 40px;
                margin-top: -20px;
                border-top: 1px solid #e0e0e0;
                border-bottom: 1px solid #e0e0e0;
                background-color: rgba(25, 137, 250, 0.05);
                pointer-events: none;
                z-index: 2;
              }
            `}</style>

            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#969799',
                  fontSize: '15px',
                  cursor: 'pointer',
                  padding: '5px 10px'
                }}
              >
                ยกเลิก
              </button>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#323233'
              }}>
                เลือกเวลา
              </span>
              <button
                type="button"
                onClick={handleConfirm}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1989fa',
                  fontSize: '15px',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  fontWeight: '600'
                }}
              >
                ตกลง
              </button>
            </div>

            {/* Time Picker */}
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Hour Column */}
              <div className="time-column-wrapper" style={{ flex: 1, position: 'relative' }}>
                <div className="selection-indicator"></div>
                <div
                  ref={hourRef}
                  className="time-column"
                  onScroll={(e) => {
                    const scrollTop = e.currentTarget.scrollTop;
                    const index = Math.round(scrollTop / 40);
                    if (index >= 0 && index < hours.length) {
                      handleSelectHour(hours[index]);
                    }
                  }}
                >
                  <div style={{ height: '80px' }}></div>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className={`time-item ${hour === selectedHour ? 'selected' : ''}`}
                      onClick={() => handleSelectHour(hour)}
                    >
                      {hour}
                    </div>
                  ))}
                  <div style={{ height: '80px' }}></div>
                </div>
                <div style={{
                  textAlign: 'center',
                  marginTop: '8px',
                  fontSize: '13px',
                  color: '#969799'
                }}>
                  ชั่วโมง
                </div>
              </div>

              {/* Separator */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '24px',
                fontWeight: '600',
                color: '#323233',
                paddingBottom: '30px'
              }}>
                :
              </div>

              {/* Minute Column */}
              <div className="time-column-wrapper" style={{ flex: 1, position: 'relative' }}>
                <div className="selection-indicator"></div>
                <div
                  ref={minuteRef}
                  className="time-column"
                  onScroll={(e) => {
                    const scrollTop = e.currentTarget.scrollTop;
                    const index = Math.round(scrollTop / 40);
                    if (index >= 0 && index < minutes.length) {
                      handleSelectMinute(minutes[index]);
                    }
                  }}
                >
                  <div style={{ height: '80px' }}></div>
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      className={`time-item ${minute === selectedMinute ? 'selected' : ''}`}
                      onClick={() => handleSelectMinute(minute)}
                    >
                      {minute}
                    </div>
                  ))}
                  <div style={{ height: '80px' }}></div>
                </div>
                <div style={{
                  textAlign: 'center',
                  marginTop: '8px',
                  fontSize: '13px',
                  color: '#969799'
                }}>
                  นาที
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;