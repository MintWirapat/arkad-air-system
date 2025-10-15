import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import image1 from '../images/Banner1.png';
import Navbar from '../components/Navbar.tsx';
import DownloadButton from '../components/DownloadApp.tsx';
import ProductCard from '../components/ProductCard.tsx'; // ปรับ path ให้ถูก



const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const products = [
    {
      name: 'Arkad PPV',
      subtitle: 'เครื่องเติมอากาศสะอาด',
      description: 'เติมอากาศสะอาด ป้องกันฝุ่น PM2.5 เชื้อโรค สารก่อภูมิแพ้ ลดคาร์บอนสะสม ควบคุมผ่านมือถือ',
      image: require("../images/ArkadPPV.png"),
      price: '฿23,400',
    },
    {
      name: 'Arkad ERV',
      subtitle: 'เครื่องเติมอากาศสะอาด',
      description: 'เติมอากาศสะอาด ป้องกันฝุ่น PM2.5 เชื้อโรค สารก่อภูมิแพ้ ลดคาร์บอนสะสม ควบคุมผ่านมือถือ',
      image: require("../images/ArkadERV.png"),
      price: '฿34,200',
    },
    {
      name: 'Arkad Dust Walker',
      subtitle: 'เครื่องวัดคุณภาพอากาศพกพา',
      description: 'อุปกรณ์เซนเซอร์ตรวจวัดคุณภาพอากาศแบบพกพา สะดวกใช้งานง่าย3 in 1 : PM2.5 CO2 Temp',
      specs: '3 in 1 : PM2.5 CO₂ Temp',
      image: require("../images/DustWalker.png"),
      price: '฿3,200',
    },
    {
      name: 'Arkad Mornitor',
      subtitle: 'เครื่องวัดคุณภาพอากาศแบบตั้งโต๊ะ',
      description: 'เครื่องวัดคุณภาพอากาศแบบตั้งโต๊ะ แสดงคุณภาพอากาศแบบเรียลไทม์ พร้อมเซนเซอร์ตรวจคุณภาพอากาศแบบละเอียด ที่สามารถสามารถแสดงข้อมูลสภาพอากาศบน APP ได้',
      image: require("../images/monitor.png"),
      price: '฿6,500',
    },
    {
      name: 'Arkad IPV',
      subtitle: 'เครื่องเติมอากาศสะอาดแบบติดตั้งภายในบ้าน',
      description: 'ควบคุมระบบเติมอากาศผ่านแอพพลิเคชั่น เชื่อมต่อ WiFi และ IoT',
      image: require("../images/ArkadIPV.png"),
      price: 'Coming Soon...',
    }
  ];

  const itemsPerPage = 3;
  const maxSlide = Math.ceil(products.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide(prev => prev < maxSlide ? prev + 1 : prev);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560)',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            คิดถึงอากาศสะอาดต้อง Arkad
          </h1>

          {/* เส้นแบ่ง */}
          <div
            className="w-[50%] border-t-[3px] border-white my-4"
          ></div>

          <p className="text-4xl md:text-5xl font-bold text-center mb-2">
            Fresh Air Fresh Life
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="relative px-16">
          {/* ปุ่มเลื่อนซ้าย - ซ่อนในมือถือ */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`hidden md:flex absolute left-0 top-0 bottom-0 z-10 bg-white rounded-full w-12 items-center justify-center shadow-lg border border-gray-200 transition-opacity ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'
              }`}
          >
            <ArrowRight size={32} className="rotate-180 text-blue-500" strokeWidth={2.5} />
          </button>

          {/* ปุ่มเลื่อนขวา - ซ่อนในมือถือ */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === maxSlide}
            className={`hidden md:flex absolute right-0 top-0 bottom-0 z-10 bg-white rounded-full w-12 items-center justify-center shadow-lg border border-gray-200 transition-opacity ${currentSlide === maxSlide ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'
              }`}
          >
            <ArrowRight size={32} className="text-blue-500" strokeWidth={2.5} />
          </button>

          {/* Products Carousel */}
          <div
            className="overflow-hidden touch-pan-y"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as HTMLDivElement).dataset.startX = touch.clientX.toString();
            }}
            onTouchEnd={(e) => {
              const startX = parseFloat((e.currentTarget as HTMLDivElement).dataset.startX || '0');
              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;

              if (diff > 50 && currentSlide < maxSlide) {
                nextSlide();
              } else if (diff < -50 && currentSlide > 0) {
                prevSlide();
              }
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)` }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {product.subtitle}
                      </p>
                      <p className="text-sm text-gray-600 mb-2 flex-grow">
                        {product.description}
                      </p>
                      {product.specs && (
                        <p className="text-sm text-gray-600 mb-4">
                          {product.specs}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {product.price}
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200">
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DownloadButton />

      {/* ระบบเติมอากาศสะอาด Section */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-lg mx-auto text-center mb-12">
          <h2 className=" p-6 text-3xl cols-4 font-bold bg-white  bg-opacity-20  backdrop-blur-md text-white text-center mb-12 rounded-lg ">
            ระบบเติมอากาศสะอาด
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4">


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center text-white bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">เติมอากาศสะอาด</h3>
              <p className="text-sm">ระบบกรองฝุ่น PM2.5ฝุ่นขนาดเล็ก และสารก่อภูมิแพ้</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center text-white bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">อากาศหมุนเวียน</h3>
              <p className="text-sm">อากาศภายในบ้านมีการหมุนเวียนแม้จะปิดประตูแหละหน้าต่าง</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center text-white bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">ปกป้องคุณในบ้าน</h3>
              <p className="text-sm">แผ่นกรองสามารถกรองเชื้อโรคขนาดเล็กได้ปลอดภัยหายห่วง</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center text-white bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">บ้านอากาศสะอาด</h3>
              <p className="text-sm">สร้างห้องแรงดันบวกให้กับบ้าน กันฝุ่นเข้าดันฝุ่นในบ้านออก</p>
            </div>
          </div>
        </div>
      </section>


      {/* รูป Banner2.png */}
      <div className="mb-2 mt-16">
        <div className="text-center">
          <img
            src={require("../images/Banner2.png")}
            alt="Arkad Positive Pressure System"
            className="w-full scale-110 max-w-5xl mx-auto rounded-lg "
          />
        </div>
      </div>

      {/* รูป image3.png */}
      <div className="mb-2 mt-16">
        <div className="text-center">
          <img
            src={require("../images/Banner3.png")}
            alt="Arkad Positive Pressure System"
            className="w-full scale-110 max-w-5xl mx-auto rounded-lg "
          />
        </div>
      </div>

      <ProductCard />



    </div>
  );
};

export default HomePage;