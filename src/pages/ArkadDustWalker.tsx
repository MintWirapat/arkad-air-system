// src/pages/ArkadDustWalker.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../components/Navbar.tsx";
import ProductNavBar from "../components/ProductNavBar.tsx";
import Footer from "../components/Footer.tsx";

const ArkadDustWalker: React.FC = () => {
    const images = [
        require("../images/DustWalker.png"),
        require("../images/dwl1.png"),
        require("../images/dwb.png"),
        require("../images/dwb1.png"),
    ];
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    const [selectedModel, setSelectedModel] = useState("Dust Walker");
    const models = ["Dust Walker"];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ProductNavBar />

            {/* breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
                    <Link to="/" className="hover:text-gray-900 flex items-center whitespace-nowrap">
                        <Home size={16} className="mr-1" />
                        Home
                    </Link>
                    <ChevronRight size={16} className="flex-shrink-0" />
                    <Link to="/" className="hover:text-gray-900 whitespace-nowrap">
                        Products
                    </Link>
                    <ChevronRight size={16} className="flex-shrink-0" />
                    <span className="text-gray-900 font-medium whitespace-nowrap">Arkad Dust Walker</span>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
                <div className="bg-white rounded-2xl shadow-md">
                    <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* ซ้าย: Carousel */}
                        <div className="relative flex items-center justify-center">
                            {images.length > 1 && (
                                <>
                                    <button onClick={prev} className="absolute left-2 md:left-6 text-gray-500 hover:text-gray-700 z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 md:w-8 md:h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button onClick={next} className="absolute right-2 md:right-6 text-gray-500 hover:text-gray-700 z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 md:w-8 md:h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                            <div className="w-full">
                                <img src={images[current]} alt="Arkad Dust Walker" className="w-full max-h-[300px] md:max-h-[420px] object-contain rounded-xl transition-all duration-500 drop-shadow-lg" />
                            </div>
                            {images.length > 1 && (
                                <div className="absolute bottom-4 flex space-x-2">
                                    {images.map((_, i) => (
                                        <div key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer ${current === i ? "bg-blue-500" : "bg-gray-300"}`} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ขวา: ข้อมูลสินค้า */}
                        <div className="flex flex-col text-left">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-1">
                                เครื่องวัดคุณภาพอากาศแบบพกพา
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500 mb-4">
                                (Arkad Dust Walker Meter)
                            </p>

                            {/* กล่องราคา */}
                            <div className="flex items-center gap-2 md:gap-4 mb-6">
                                <div className="bg-white rounded-xl border flex flex-col md:flex-row w-full">
                                    <div className="px-4 md:px-6 py-3 shadow-sm">
                                        <span className="text-2xl md:text-4xl font-semibold text-[#00AEEF]">฿3,200</span>
                                    </div>
                                    <div className="border-t md:border-t-0 md:border-l">
                                        <span className="text-xs text-gray-500 p-3 block text-center md:text-right">
                                            ราคาดังกล่าวเป็นเพียงแนวทางเท่านั้น <br /> โดยยังไม่รวมค่าขนส่ง
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* รายละเอียดสินค้า */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm">Arkad Dust Walker Meter</p>
                                        <p className="text-sm">เครื่องวัดคุณภาพอากาศแบบพกพา ขนาดกะทัดรัด พกง่าย ฟังก์ชันการใช้งาน</p>
                                        <p className="text-sm">ครบครัน ช่วยคุณติดตามคุณภาพอากาศในทุกๆการเดินทาง</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm">PM 2.5</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm">Temp</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm">HUM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ปุ่มเลือกรุ่น + SHOP NOW */}
                    <div className="flex flex-col items-center justify-center py-6 md:py-10 px-6 md:px-4">
                        {/* ปุ่มเลือกรุ่น */}
                        <div className="w-full overflow-x-auto scrollbar-hide mb-6 md:mb-8">
                            <div className="flex justify-center gap-3 md:gap-6 min-w-max md:min-w-0 px-4 md:px-0">
                                {models.map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setSelectedModel(m)}
                                        className={`px-4 md:px-8 py-2 md:py-3 rounded-full border text-sm md:text-base transition whitespace-nowrap ${
                                            selectedModel === m
                                                ? "border-blue-500 text-blue-600 font-semibold"
                                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                                        }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => window.open("https://lin.ee/VjnF650", "_blank")}
                            className="w-full max-w-3xl bg-[#00AEEF] text-white font-semibold py-3 md:py-4 rounded-full hover:bg-[#0098d6] transition text-center"
                        >
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* รูปย่อยด้านล่าง */}
            <div className="overflow-x-auto scrollbar-hide px-4">
                <div className="flex justify-center gap-4 md:gap-6 min-w-max md:min-w-0 pb-4">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Arkad preview ${i + 1}`}
                            className="w-24 h-24 md:w-36 md:h-36 object-contain border rounded-xl hover:scale-105 transition cursor-pointer flex-shrink-0"
                            onClick={() => setCurrent(i)}
                        />
                    ))}
                </div>
            </div>

            {/* รูป Banner */}
            <div className="mb-8 md:mb-12 mt-8 md:mt-16 px-4">
                <div className="text-center">
                    <img
                        src={require("../images/infoDW.png")}
                        alt="Arkad Dust Walker Info"
                        className="w-full max-w-5xl mx-auto rounded-lg"
                    />
                </div>
            </div>

            <div className="px-6 mb-6">
                <button
                    onClick={() => window.open("https://lin.ee/VjnF650", "_blank")}
                    className="w-full max-w-3xl mx-auto block bg-[#00AEEF] text-white font-semibold py-3 md:py-4 rounded-full hover:bg-[#0098d6] transition text-center"
                >
                    SHOP NOW
                </button>
            </div>

            <div className="border-t-2 border-gray-300 mt-6 md:mt-10"></div>
            <Footer />
        </div>
    );
};

export default ArkadDustWalker;