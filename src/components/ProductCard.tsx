import React from 'react';
import { MessageCircle, Facebook, Music, Instagram } from 'lucide-react';
import Footer from '../components/Footer.tsx';

const ProductCard = () => {
    const products = [
        {
            id: 1,
            title: "งานระบบเติมอากาศ",
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
            features: [
                "ปรึกษาและแก้ไขปัญหาอากาศภายในบ้าน",
                "คำนวณปริมาตรห้องปลอดฝุ่น",
                "ประเมินราคาระบบเติมอากาศ",
                "ออกแบบ และติดตั้งระบบเติมอากาศ",
                "ประสบการณ์งานระบบเติมอากาศมากกว่า 5 ปี"
            ]
        }
    ];

    const socialLinks = [
        {
            icon: MessageCircle,
            label: "LINE",
            url: "https://lin.ee/VjnF650",
            color: "bg-green-500",
            image: require("../images/logoline.png")
        },
        {
            icon: Facebook,
            label: "Facebook",
            url: "https://www.facebook.com/share/1AFdd1NQC8/",
            color: "bg-blue-600",
            image: require("../images/logoface.png")
        },
        {
            icon: Music,
            label: "TikTok",
            url: "https://www.tiktok.com/@arkadofficial?_t=ZS-90aROr137XM&_r=1",
            color: "bg-black",
            image: require("../images/logotiktok.png")
        },
        {
            icon: Instagram,
            label: "Instagram",
            url: "https://www.instagram.com/arkadfresh?igsh=MWp1dnhnNm5vNTAwdg==",
            color: "bg-pink-500",
            image: require("../images/logoig.png")
        }
    ];

    return (
        <>
            {/* Product Cards with Box Border */}
            <div className="py-12 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                                {/* Image Section */}
                                <div className="w-full md:w-2/5 flex-shrink-0">
                                    <img
                                        src={require("../images/image4.png")}
                                        alt={product.title}
                                        className="w-full h-auto object-cover rounded-2xl shadow-lg"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-3/5">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                                        {product.title}
                                    </h2>

                                    {/* Features List */}
                                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                                        {product.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start text-gray-700 text-sm md:text-base"
                                            >
                                                <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Button */}
                                    <button
                                        onClick={() => window.open("https://lin.ee/VjnF650", "_blank")}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-colors text-base"
                                    >
                                        ติดต่อสอบถาม
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Media Section - แก้ไขส่วนนี้ */}
            <div className="bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">
                        ช่องทางการติดตาม
                    </h3>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-4 gap-3 md:gap-5 justify-items-center">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-3 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                                        <img
                                            src={social.image}
                                            alt={social.label}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ใช้ Footer component */}
            <Footer />

            {/* Black Bar */}
            <div className="bg-black h-10"></div>
        </>
    );
};

export default ProductCard;