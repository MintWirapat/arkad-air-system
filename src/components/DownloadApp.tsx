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
      ios: 'https://apps.apple.com/app/arkad',
      android: 'https://play.google.com/store/apps/details?id=com.appmatrixdevelopment.arkad'
    };

    window.open(urls[platform], '_blank');
    setShowPopup(false);
  };

  return (
    <>
      {/* Download Button */}
      <div
        onClick={showDownloadOptions}
        className="fixed bottom-5 right-5 bg-blue-500 rounded-xl px-4 py-3 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all z-[99] md:bottom-20"
      >
        <div className="flex items-center gap-3">
          <img
            src={require('../images/logo1.png')}
            alt="Download App"
            className="w-8 h-8 rounded-lg md:w-12 md:h-12"
          />
          {!isSmallScreen && (
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">
                ดาวน์โหลด Arkad
              </span>
              <span className="text-white/80 text-xs">
                ใช้งานง่ายกว่าบนแอพ
              </span>
            </div>
          )}
        </div>
      </div>

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
              <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
                ดาวน์โหลด Arkad App
              </h3>

              <div className="flex flex-col gap-4 mb-6">
                {/* iOS Button */}
                <button
                  onClick={() => downloadApp('ios')}
                  className="flex items-center justify-center gap-3 w-full h-12 bg-blue-500 text-white rounded-lg font-medium text-base hover:bg-blue-600 transition-colors"
                >
                  <img
                    src="/ARKAD-01.png"
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
                    src="/ARKAD-01.png"
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

      <style >{`
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