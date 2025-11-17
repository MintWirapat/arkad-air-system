import React, { useState, useEffect } from 'react';

export default function DownloadButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const showDownloadOptions = () => {
    setShowPopup(true);
  };

  const downloadApp = (platform: 'ios' | 'android') => {
    const urls = {
      ios: 'https://apps.apple.com/th/app/arkad/id6745466731?l=th',
      android: 'https://play.google.com/store/apps/details?id=com.appmatrixdevelopment.arkad&pcampaignid=web_share'
    };

    window.open(urls[platform], '_blank');
    setShowPopup(false);
  };

  return (
    <>
      {/* Download Button */}
      {isSmallScreen ? (
        // Mobile View - แสดงเฉพาะไอคอนพร้อมข้อความ Download App
        <div
          onClick={showDownloadOptions}
          className="fixed bottom-5 right-5 z-[80] cursor-pointer"
          style={{ width: '80px', maxWidth: '90vw' }}
        >
          <div className="text-center mb-2">
            <p className="text-black text-xs font-semibold whitespace-nowrap">Download App</p>
          </div>
          <div className="bg-blue-600 rounded-xl p-1.5 flex items-center justify-center hover:bg-blue-700 transition-all hover:shadow-lg">
            <img
              src={require('../images/logo1.png')}
              alt="Download App"
              className="w-14 h-14 rounded-lg"
            />
          </div>
        </div>
      ) : (
        // Desktop View - แสดงแบบเต็ม
        <div
          onClick={showDownloadOptions}
          className="fixed bottom-5 right-5 bg-blue-600 rounded-xl px-4 py-3 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all z-[80]"
        >
          <div className="flex items-center gap-3">
            <img
              src={require('../images/logo1.png')}
              alt="Download App"
              className="w-12 h-12 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">
                ดาวน์โหลด Arkad
              </span>
              <span className="text-white/80 text-xs">
                ใช้งานง่ายกว่าบนแอพ
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Download Options Popup */}
      {showPopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setShowPopup(false)}
          />

          {/* Popup */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-[101] animate-slide-up">
            <div className="max-w-md mx-auto">
              {/* Logo และชื่อแอพ */}
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  ดาวน์โหลด Arkad App
                </h3>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                {/* iOS Button */}
                <button
                  onClick={() => downloadApp('ios')}
                  className="flex items-center justify-center gap-3 w-full h-12 bg-blue-500 text-white rounded-lg font-medium text-base hover:bg-blue-600 transition-colors"
                >
                  <img
                    src={require("../images/App_Store.png")}
                    alt="iOS"
                    className="w-6 h-6"
                  />
                  Download on App Store
                </button>

                {/* Android Button */}
                <button
                  onClick={() => downloadApp('android')}
                  className="flex items-center justify-center gap-3 w-full h-12 bg-blue-500 text-white rounded-lg font-medium text-base hover:bg-blue-600 transition-colors"
                >
                  <img
                    src={require("../images/playstore.png")}
                    alt="Android"
                    className="w-6 h-6"
                  />
                  Get it on Google Play
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="w-full h-11 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}