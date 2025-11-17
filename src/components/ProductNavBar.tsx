import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProductNavBar = () => {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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
      name: 'Manual',
      path: '/manual',
      image: require('../images/boxicon.png')
    },
  ];

  // กู้คืน scroll position เมื่อ component mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // อ่านตำแหน่งจาก sessionStorage
    const savedScrollLeft = sessionStorage.getItem('productNavBarScrollLeft');
    if (savedScrollLeft) {
      container.scrollLeft = parseInt(savedScrollLeft, 10);
    }
  }, []);

  // บันทึก scroll position เมื่อ scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container && !isDraggingRef.current) {
      sessionStorage.setItem('productNavBarScrollLeft', container.scrollLeft.toString());
    }
  };

  // จัดการ mouse/touch events
  const handlePointerDown = (e: React.PointerEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 2; // คูณ 2 เพื่อให้เลื่อนเร็วขึ้น
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.style.userSelect = 'auto';
    }
  };

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
          
          .product-scroll-container {
            cursor: grab;
          }
          
          .product-scroll-container:active {
            cursor: grabbing;
          }
        `}</style>

        <div
          ref={scrollContainerRef}
          className="product-scroll-container overflow-x-auto scrollbar-hide px-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            overscrollBehaviorX: 'contain',
            scrollSnapType: 'none'
          }}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="flex justify-start md:justify-center items-center gap-6 md:gap-10 lg:gap-12 min-w-max">
            {products.map((product) => {
              const isActive = location.pathname === product.path;

              return (
                <Link
                  key={product.name}
                  to={product.path}
                  ref={isActive ? activeItemRef : null}
                  className="group flex flex-col items-center transition-all duration-300 flex-shrink-0"
                  onClick={(e) => {
                    // ถ้ากำลัง drag อยู่ ยกเลิกการคลิก
                    if (isDraggingRef.current || Math.abs(scrollLeftRef.current - (scrollContainerRef.current?.scrollLeft || 0)) > 5) {
                      e.preventDefault();
                    }
                  }}
                  style={{ pointerEvents: isDraggingRef.current ? 'none' : 'auto' }}
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
                      draggable="false"
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