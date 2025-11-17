// src/pages/ManualPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Download } from "lucide-react";
import Navbar from "../components/Navbar.tsx";
import ProductNavBar from "../components/ProductNavBar.tsx";
import Footer from "../components/Footer.tsx";
import googlePlayIcon from "../images/Google Play.png";
import appStoreIcon from "../images/App Store.png";

const ManualPage: React.FC = () => {
  // ฟังก์ชันสำหรับดาวน์โหลดไฟล์ PDF
  const handleDownload = (fileName: string) => {
    try {
      // Import PDF file dynamically จาก manuals folder
      const pdfFile = require(`../manuals/${fileName}`);
      
      // สร้าง link element สำหรับดาวน์โหลด
      const link = document.createElement('a');
      link.href = pdfFile;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('ไม่สามารถดาวน์โหลดไฟล์ได้ กรุณาลองใหม่อีกครั้ง');
    }
  };

  // ข้อมูลคู่มือการใช้งาน
  const manuals = [
    {
      title: 'คู่มือ ใช้งานเครื่องเติมอากาศ PPV',
      fileName: 'คู่มือใช้งาน PPV.pdf'
    },
    {
      title: 'คู่มือ ใช้งานเครื่องเติมอากาศ ERV',
      fileName: 'คู่มือใช้งาน ERV.pdf'
    },
    {
      title: 'คู่มือ ติดตั้งเครื่องเติมอากาศ PPV',
      fileName: 'คู่มือติดตั้ง PPV.pdf'
    },
    {
      title: 'คู่มือ ใช้งานเครื่องเติมอากาศ ERV',
      fileName: 'คู่มือติดตั้ง ERV.pdf'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProductNavBar />

      {/* breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
          <Link to="/" className="hover:text-gray-900 flex items-center whitespace-nowrap">
            <Home size={16} className="mr-1" />
            Home
          </Link>
          <ChevronRight size={16} className="flex-shrink-0" />
          <Link to="/" className="hover:text-gray-900 whitespace-nowrap">
            Products
          </Link>
          <ChevronRight size={16} className="flex-shrink-0" />
          <span className="text-gray-900 font-medium whitespace-nowrap">Manual</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* App Arkad Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            App Arkad
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Android */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-left">
                Android
              </h2>
              <a
                href="https://play.google.com/store/apps/details?id=com.appmatrixdevelopment.arkad&pcampaignid=web_share" // TODO: ใส่ลิงค์ Google Play Store ที่นี่
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl px-6 py-4 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <img
                    src={googlePlayIcon}
                    alt="Google Play"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  Download on Google Play
                </span>
              </a>
            </div>

            {/* iOS */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-left">
                iOS
              </h2>
              <a
                href="https://apps.apple.com/th/app/arkad/id6745466731?l=th" // TODO: ใส่ลิงค์ App Store ที่นี่
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl px-6 py-4 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <img
                    src={appStoreIcon}
                    alt="App Store"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  Download on App Store
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Manual Section */}
        <div className="mt-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Manual
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {manuals.map((manual, index) => (
              <div key={index}>
                <h3 className="text-base md:text-lg font-medium mb-4 text-gray-800 text-left">
                  {manual.title}
                </h3>
                <button
                  onClick={() => handleDownload(manual.fileName)}
                  className="w-full flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl px-6 py-4 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-2 group-hover:bg-blue-50 transition-colors">
                    <Download className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    Downlad PDF
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* เส้นขีดกั้น */}
      <div className="border-t-2 border-gray-300 mt-6 md:mt-10"></div>

      <Footer />
    </div>
  );
};

export default ManualPage;