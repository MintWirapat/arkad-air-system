import React from 'react';
import { MessageCircle, Facebook, Music, Instagram } from 'lucide-react';

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
            url: "https://line.me/",
            color: "bg-green-500",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/200px-LINE_logo.svg.png"
        },
        {
            icon: Facebook,
            label: "Facebook",
            url: "https://facebook.com/",
            color: "bg-blue-600",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/120px-Facebook_Logo_%282019%29.png"
        },
        {
            icon: Music,
            label: "TikTok",
            url: "https://tiktok.com/",
            color: "bg-black",
            image: require("../images/logotiktok.png")
        },
        {
            icon: Instagram,
            label: "Instagram",
            url: "https://instagram.com/",
            color: "bg-pink-500",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/120px-Instagram_icon.png"
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
                            className="border-2 border-gray-300 rounded-3xl p-8 bg-white shadow-sm"
                        >
                            <div className="flex gap-8 items-start">
                                {/* Image Section */}
                                <div className="w-2/5 flex-shrink-0">
                                    <img
                                        src={require("../images/image4.png")}
                                        alt={product.title}
                                        className="w-full h-auto object-cover rounded-2xl shadow-lg"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-3/5">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                        {product.title}
                                    </h2>

                                    {/* Features List */}
                                    <ul className="space-y-3 mb-8">
                                        {product.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start text-gray-700 text-base"
                                            >
                                                <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Button */}
                                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-colors text-base">
                                        ติดต่อสอบถาม
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        ช่องทางการติดตาม
                    </h3>
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => {
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200"
                                >
                                    <img
                                        src={social.image}
                                        alt={social.label}
                                        className="w-16 h-16 object-contain"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="grid grid-cols-3 gap-8 items-center">
                        {/* Left Section */}
                        <div className="text-xs text-gray-600 leading-tight">
                            <p>บริษัท วินเซนต์ ออโตเมชั่น จำกัด</p>
                            <p>178/13 หมู่ 1 ต.หางดง อ.หางดง</p>
                            <p>จ.เชียงใหม่ 50230</p>
                        </div>

                        {/* Center Section - Logo */}
                        <div className="flex justify-center">
                            <img
                                src={require("../images/logoarkad.png")}
                                alt="Arkad Logo"
                                className="h-12 object-contain"
                            />
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end gap-2">
                            <p className="text-xs text-gray-600">arkaddee.official@gmail.com</p>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => {
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400 transition-colors border border-gray-400"
                                        >
                                            <img
                                                src={social.image}
                                                alt={social.label}
                                                className="w-5 h-5 object-contain grayscale"
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-3 pt-3 text-center text-xs text-gray-600">
                        <p>© 2025 บริษัท วินเซนต์ ออโตเมชั่น จำกัด. สงวนลิขสิทธิ์.</p>
                        <p>นโยบายความเป็นส่วนตัว | ข้อกำหนดการใช้งาน</p>
                    </div>
                </div>
            </footer>

            {/* Black Bar */}
            <div className="bg-black h-10"></div>
        </>
    );
};

export default ProductCard;