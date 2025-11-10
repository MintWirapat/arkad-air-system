import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProductNavBar = () => {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  const products = [
    {
      name: 'PPV',
      path: '/arkad-ppv',
      image: require('../images/ArkadPPV.png')
    },
    {
      name: 'ERV',
      path: '/arkad-erv',
      image: require('../images/ArkadERV.png')
    },
    {
      name: 'Dust Walker',
      path: '/arkad-dust-walker',
      image: require('../images/DustWalker.png')
    },
    {
      name: 'Monitor',
      path: '/arkad-monitor',
      image: require('../images/monitor.png')
    },
    {
      name: 'IPV',
      path: '/arkad-ipv',
      image: require('../images/ArkadIPV.png')
    },
    {
      name: 'Equipment',
      path: '',
      image: require('../images/boxicon.png')
    },
  ];

  // Scroll ไปที่รายการที่ active เมื่อ location เปลี่ยน (เฉพาะเมื่อจำเป็น)
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeItem = activeItemRef.current;

      // เช็คว่า container มี scroll ได้จริงหรือไม่
      const hasScroll = container.scrollWidth > container.clientWidth;

      // ถ้าไม่มี scroll (รายการแสดงได้หมดอยู่แล้ว) ก็ไม่ต้องทำอะไร
      if (!hasScroll) {
        return;
      }

      // เช็คว่ารายการ active และรายการข้างๆ มองเห็นได้หรือไม่
      const itemRect = activeItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // เพิ่ม margin เพื่อให้เห็นรายการข้างๆ ด้วย (ประมาณ 1-2 รายการ)
      const margin = 150; // พื้นที่สำหรับรายการข้างๆ

      const needsScrollLeft = itemRect.left < containerRect.left + margin;
      const needsScrollRight = itemRect.right > containerRect.right - margin;

      // ถ้ารายการอยู่ในมุมมองที่ดี (มีพื้นที่สำหรับรายการข้างๆ) ไม่ต้อง scroll
      if (!needsScrollLeft && !needsScrollRight) {
        return;
      }

      // คำนวณตำแหน่งที่ต้อง scroll
      const containerWidth = container.clientWidth;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;

      // ถ้าอยู่ใกล้ท้าย ให้ scroll ไปท้ายสุด
      const isNearEnd = itemLeft + itemWidth + margin * 2 > container.scrollWidth;
      if (isNearEnd) {
        container.scrollTo({
          left: container.scrollWidth - containerWidth,
          behavior: 'smooth'
        });
      } else {
        // scroll ให้อยู่ตรงกลาง แต่เว้นพื้นที่สำหรับรายการข้างๆ
        const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location.pathname]);

  return (
    <div className="relative py-6 mt-16 overflow-hidden">
      {/* พื้นหลัง */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${require('../images/Banner1.1.png')})`
        }}
      ></div>

      {/* Decorative fern leaves background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32"></div>
        <div className="absolute top-0 right-0 w-32 h-32"></div>
      </div>

      <div className="w-full relative z-10 overflow-hidden">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex justify-start md:justify-center items-center gap-6 md:gap-10 lg:gap-12 max-w-full">
            {products.map((product) => {
              const isActive = location.pathname === product.path;

              return (
                <Link
                  key={product.name}
                  to={product.path}
                  ref={isActive ? activeItemRef : null}
                  className="group flex flex-col items-center transition-all duration-300 flex-shrink-0"
                >
                  <div className={`
                   bg-white/90 backdrop-blur-sm rounded-2xl p-5 md:p-6 
                     shadow-lg transition-all duration-300
                     ${isActive
                      ? 'border-4 border-blue-500 shadow-blue-400/50'
                      : 'border-4 border-transparent hover:shadow-xl group-hover:shadow-blue-500/30 group-hover:border-blue-500/50'
                    }
                      w-28 h-28 md:w-36 md:h-36 flex items-center justify-center overflow-hidden
                    `}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className={`
                    mt-2 text-xs md:text-sm font-semibold transition-colors duration-300 whitespace-nowrap
                    ${isActive
                      ? 'text-green-300'
                      : 'text-white/80 group-hover:text-white'
                    }
                  `}>
                    {product.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNavBar;