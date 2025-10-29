import React, { useState } from 'react';
import { MapPin, Phone, Mail, Search } from 'lucide-react';
import Footer from '../components/Footer.tsx';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        topic: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('ส่งข้อมูลเรียบร้อยแล้ว');
    };

    const socialLinks = {
        facebook: "https://www.facebook.com/share/1AFdd1NQC8/",
        tiktok: "https://www.tiktok.com/@arkadofficial?_t=ZS-90aROr137XM&_r=1",
        instagram: "https://www.instagram.com/arkadfresh?igsh=MWp1dnhnNm5vNTAwdg=="
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="pt-16 pb-16 px-4"></div>

            {/* Contact Form Section */}
            <div className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">Contact Us</h1>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 md:p-12 space-y-6 md:space-y-8">
                        {/* แถวที่ 1: ชื่อ */}
                        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center">
                            <label className="text-sm md:text-base text-gray-900">ชื่อ</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="ชื่อ"
                                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
                            />
                        </div>

                        {/* แถวที่ 2: อีเมล */}
                        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center">
                            <label className="text-sm md:text-base text-gray-900">อีเมล</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="อีเมล"
                                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
                            />
                        </div>

                        {/* แถวที่ 3: หมายเลขโทรศัพท์ */}
                        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center">
                            <label className="text-sm md:text-base text-gray-900">หมายเลขโทรศัพท์</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="000-000-0000"
                                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
                            />
                        </div>

                        {/* แถวที่ 4: หัวข้อ */}
                        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 md:items-center">
                            <label className="text-sm md:text-base text-gray-900">หัวข้อ</label>
                            <input
                                type="text"
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                placeholder="หัวข้อ"
                                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Subject Radio Buttons */}
                        <div className="border-t border-gray-300 pt-6">
                            <label className="block text-sm md:text-base font-normal text-gray-900 mb-4 text-left">เลือกหัวข้อ</label>
                            <div className="grid grid-cols-1 gap-3 md:gap-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value="product-interest"
                                        checked={formData.subject === 'product-interest'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-500 border-gray-300"
                                    />
                                    <span className="text-sm text-gray-800">ติดตั้งเครื่องเติมArkad</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value="after-sales"
                                        checked={formData.subject === 'after-sales'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-500 border-gray-300"
                                    />
                                    <span className="text-sm text-gray-800">ประเมินราคาติดตั้ง/สำรวจหน้างานติดตั้ง</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value="agent-interest"
                                        checked={formData.subject === 'agent-interest'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-500 border-gray-300"
                                    />
                                    <span className="text-sm text-gray-800">ขอรายละเอียดสินค้า</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value="other"
                                        checked={formData.subject === 'other'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-500 border-gray-300"
                                    />
                                    <span className="text-sm text-gray-800">บริการอื่นๆ</span>
                                </label>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm md:text-base text-gray-900 mb-2 text-left">รายละเอียด</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="รายละเอียด"
                                rows="6"
                                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-400 resize-none placeholder-gray-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 md:pt-8">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-500 text-white py-3 md:py-4 rounded-full hover:bg-blue-600 transition-colors font-medium text-base md:text-lg shadow-lg"
                            >
                                ส่ง
                            </button>
                            <p className="text-center text-xs md:text-sm text-blue-600 pt-2">ตอบกลับภายใน 1 - 3 วัน</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* เส้นขีดกั้น */}
            <div className="border-t-2 border-gray-300"></div>

            {/* Working Hours Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12 md:pb-16">
                <div className="text-center space-y-2 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold">เวลาทำการ</h2>
                    <p className="text-lg md:text-2xl text-gray-700">จันทร์ - ศุกร์ เวลา 09:00-17:00 น.</p>
                    <p className="text-2xl md:text-3xl font-semibold pt-2">หยุดทำการ</p>
                    <p className="text-lg md:text-2xl text-gray-700">เสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์</p>
                </div>
            </div>

            {/* เส้นขีดกั้น */}
            <div className="border-t-2 border-gray-300"></div>

            {/* Contact Information Section */}
            <div className="bg-gray-50 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
                        {/* Contact Details - Left Side */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-gray-800 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm md:text-base text-gray-800 leading-relaxed text-left">
                                        บริษัท วินเซนต์ ออโตเมชั่น จำกัด<br />
                                        178/13 หมู่ ต.หางดง อ.หางดง <br />
                                        จ.เชียงใหม่ 50230
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Phone className="w-6 h-6 text-gray-800 flex-shrink-0" />
                                <p className="text-sm md:text-base text-gray-800">095 938 0230</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Mail className="w-6 h-6 text-gray-800 flex-shrink-0" />
                                <p className="text-sm md:text-base text-gray-800">arkaddee.official@gmail.com</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <img
                                    src={require("../images/7.png")}
                                    alt="Line"
                                    className="w-6 h-6 text-gray-800 flex-shrink-0 object-contain"
                                />
                                <p className="text-sm md:text-base text-gray-800">@arkad</p>
                            </div>

                            {/* ส่วนข้อมูลติดต่อ - แก้ไขตรงนี้ */}
                            <div className="pt-6">
                                <p className="font-semibold text-gray-900 mb-4 text-left md:text-left">ข้อมูลติดต่อ</p>
                                <div className="flex justify-start md:justify-start gap-5">
                                    {/* Facebook */}
                                    <a
                                        href={socialLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>

                                    {/* TikTok */}
                                    <a
                                        href={socialLinks.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href={socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map Section - Right Side */}
                        <div className="space-y-4">
                            <div className="relative h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                                <img
                                    src={require("../images/5.png")}
                                    alt="Location Map"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <p className="font-semibold text-gray-900 mb-2 text-sm md:text-base">แผนที่</p>
                                <div className="flex items-center space-x-2 text-blue-600">
                                    <Search className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <a
                                        href="https://maps.app.goo.gl/G2wXZom2HK26Unu26"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs md:text-sm hover:underline break-all"
                                    >
                                        https://maps.app.goo.gl/G2wXZom2HK26Unu26
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* เส้นขีดกั้น */}
            <div className="border-t-2 border-gray-300"></div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ContactUs;