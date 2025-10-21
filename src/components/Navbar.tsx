import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Products', href: '/arkad-ppv' },
    { name: 'Air Quality', href: '/air-quality' },
    { name: 'About', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="flex justify-center">
                <img
                  src={require("../images/logoarkad.png")}
                  alt="Arkad Logo"
                  className="h-12 object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href="/place-Regis"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200"
            >
              ลงทะเบียนร้านค้า
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href="#signup"
              className="block mx-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium text-center transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              ลงทะเบียนร้านค้า
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;