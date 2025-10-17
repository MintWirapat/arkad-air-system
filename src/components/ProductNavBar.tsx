import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProductNavBar = () => {
  const location = useLocation();
  
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

  return (
    
    <div className="relative py-6 mt-16">
        {/* 🔴 พื้นหลัง - ใส่รูปของคุณที่นี่ */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${require('../images/Banner1.1.png')})` // 🔴 เปลี่ยนชื่อไฟล์ตรงนี้
        }}
      ></div>

      {/* Decorative fern leaves background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32"></div>
        <div className="absolute top-0 right-0 w-32 h-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center gap-6 md:gap-10 lg:gap-12">
          {products.map((product) => {
            const isActive = location.pathname === product.path;
            
            return (
              <Link
                key={product.name}
                to={product.path}
                className={`group flex flex-col items-center transition-all duration-300 ${
                  isActive ? 'transform scale-110' : 'hover:scale-105'
                }`}
              >
                <div className={`
                  bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-4 
                  shadow-lg transition-all duration-300
                  ${isActive 
                    ? 'ring-4 ring-green-400 shadow-green-400/50' 
                    : 'hover:shadow-xl group-hover:shadow-green-500/30'
                  }
                  w-20 h-20 md:w-24 md:h-24 flex items-center justify-center
                `}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`
                  mt-2 text-xs md:text-sm font-semibold transition-colors duration-300
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
  );
};

export default ProductNavBar;