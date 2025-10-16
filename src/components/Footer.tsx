import React from 'react';
import { MessageCircle, Facebook, Music, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
    const socialLinks = [
        {
            icon: MessageCircle,
            label: "LINE",
            url: "https://lin.ee/VjnF650",
            color: "bg-green-500",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/200px-LINE_logo.svg.png"
        },
        {
            icon: Facebook,
            label: "Facebook",
            url: "https://www.facebook.com/share/1AFdd1NQC8/",
            color: "bg-blue-600",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/120px-Facebook_Logo_%282019%29.png"
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/120px-Instagram_icon.png"
        }
    ];

    return (
        <>
            
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

export default Footer;