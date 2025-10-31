import React from 'react';
import { MessageCircle, Facebook, Music, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
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
            {/* Footer */}
            <footer className="bg-white">
                <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
                    <div className="grid grid-cols-3 gap-4 md:gap-8 items-start md:items-center">
                        {/* Left Section */}
                        <div className="text-[10px] md:text-sm text-gray-600 leading-tight md:leading-relaxed">
                            <p className="whitespace-nowrap">บริษัท วินเซนต์ ออโตเมชั่น จำกัด</p>
                            <p>178/13 หมู่ 1 ต.หางดง อ.หางดง</p>
                            <p>จ.เชียงใหม่ 50230</p>
                        </div>

                        {/* Center Section - Logo */}
                        <div className="flex justify-center">
                            <img
                                src={require("../images/logoarkad.png")}
                                alt="Arkad Logo"
                                className="h-10 md:h-16 object-contain"
                            />
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end gap-2 md:gap-4">
                            <p className="text-[10px] md:text-sm text-gray-600 text-right">arkaddee.official@gmail.com</p>
                            <div className="flex gap-3 md:gap-5">
                                {socialLinks.map((social, index) => {
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:opacity-70 transition-all duration-300"
                                        >
                                            <img
                                                src={social.image}
                                                alt={social.label}
                                                className="w-8 h-8 md:w-12 md:h-12 object-contain "
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 text-center text-[9px] md:text-sm text-gray-600 space-y-1 px-2">
                        <p className="leading-tight">© 2025 บริษัท วินเซนต์ ออโตเมชั่น จำกัด. สงวนลิขสิทธิ์.</p>
                        <p className="text-[8px] md:text-sm">นโยบายความเป็นส่วนตัว | ข้อกำหนดการใช้งาน</p>
                    </div>
                </div>
            </footer>

           
        </>
    );
};

export default Footer;