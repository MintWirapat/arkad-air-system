// src/pages/ArkadERV.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../components/Navbar.tsx";
import ProductNavBar from "../components/ProductNavBar.tsx";
import Footer from "../components/Footer.tsx";

const ArkadERV: React.FC = () => {
    const images = [
        require("../images/ArkadERV.png")
    ];

    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    const modelData: Record<string, { price: number; area: number }> = {
        "Arkad ERV 160T": { price: 34200, area: 32 },
        "Arkad ERV 250T": { price: 44800, area: 50 },
    };

    const models = Object.keys(modelData);
    const [selectedModel, setSelectedModel] = useState<string>("Arkad ERV 160T");

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
                    <span className="text-gray-900 font-medium whitespace-nowrap">Arkad ERV</span>
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
                                <img src={images[current]} alt="Arkad ERV" className="w-full max-h-[300px] md:max-h-[420px] object-contain rounded-xl transition-all duration-500 drop-shadow-lg" />
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
                                เครื่องเติมอากาศสะอาดแบบหมุนเวียน <br /> Arkad ERV + จอควบคุม
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500 mb-4">
                                (Arkad Positive Pressure Air Ventilation)
                                <br />
                                (Arkad Touch Control Panel)
                            </p>

                            {/* กล่องราคา */}
                            <div className="flex items-center gap-2 md:gap-4 mb-6">
                                <div className="bg-white rounded-xl border flex flex-col md:flex-row w-full">
                                    <div className="px-4 md:px-6 py-3 shadow-sm">
                                        <span className="text-2xl md:text-4xl font-semibold text-[#00AEEF]">
                                            ฿{modelData[selectedModel].price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="border-t md:border-t-0 md:border-l">
                                        <span className="text-xs text-gray-500 p-3 block text-center md:text-right">
                                            ราคาดังกล่าวเป็นเพียงแนวทางเท่านั้น <br /> โดยยังไม่รวมค่าขนส่งและค่าติดตั้ง
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 3 กล่องข้อมูล */}
                            <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-3 md:border-r border-black">
                                    <img src={require("../images/iconarea.png")} alt="พื้นที่ใช้งาน" className="w-10 h-10 object-contain flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold">พื้นที่ใช้งาน</p>
                                        <p className="text-lg font-semibold">{modelData[selectedModel].area}</p>
                                        <p className="text-sm text-gray-500">ตารางเมตร</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 md:border-r border-black">
                                    <img src={require("../images/filtericon.png")} alt="ระบบกรอง" className="w-10 h-10 object-contain flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold">ระบบกรองอากาศ</p>
                                        <p className="text-sm font-semibold">3 ชั้น</p>
                                        <p className="text-xs text-gray-500">Pre Filter Activated Carbon HEPA H13</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3">
                                    <img src={require("../images/touchscreen.png")} alt="Application" className="w-10 h-10 object-contain flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold">Application</p>
                                        <p className="text-sm text-black">แอป Arkad</p>
                                        <p className="text-xs text-gray-500">ควบคุมอุปกรณ์เช็คคุณภาพอากาศได้ทุกที่</p>
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

                {/* รูปย่อยด้านล่าง */}
                <div className="overflow-x-auto scrollbar-hide px-4 md:px-0 mt-10 md:mt-10">
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
            </div>

            {/* รูป Banner */}
            <div className="mb-2 mt-2 md:mt-16 px-4">
                <div className="text-center">
                    <img
                        src={require("../images/infoERV.png")}
                        alt="Arkad Possitive Pressure Air Ventilation"
                        className="w-full max-w-5xl mx-auto rounded-lg"
                    />
                </div>
            </div>

            <div className="mb-2 mt-8 md:mt-16 px-4">
                <div className="text-center">
                    <img
                        src={require("../images/touchcontroll.png")}
                        alt="touchcontroll"
                        className="w-full max-w-5xl mx-auto rounded-lg"
                    />
                </div>
            </div>

            {/* Product Bundle */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-2 mt-8 md:mt-16 px-4">
                <div className="text-center">
                    <div className="bg-gray-100 rounded-lg p-4 md:p-6 mb-2 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto border border-gray-100">
                        <img
                            src={require("../images/ArkadERV.png")}
                            alt="Arkad ERV"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <div className="text-xs md:text-sm font-medium">Arkad ERV</div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-400">+</div>
                <div className="text-center">
                    <div className="bg-gray-100 rounded-lg p-4 md:p-6 mb-2 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto">
                        <img
                            src={require("../images/Arkad1440.png")}
                            alt="Arkad TC"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <div className="text-xs md:text-sm font-medium">Arkad TC</div>
                </div>
            </div>

            <div className="text-center mb-6 px-4">
                <div className="text-2xl md:text-3xl text-blue-500 mb-2">
                    ฿{modelData[selectedModel].price.toLocaleString()}
                </div>
                <div className="text-xs md:text-sm text-gray-500 bg-gray-200 py-2 px-4 rounded">
                    *ราคาต่ออุปกรณ์ควรต้องเพิ่มเติมค่าแรงติดตั้ง โปรดติดต่อตัวแทนจำหน่ายสำหรับราคาที่ดีที่สุด*
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

            {/* เส้นขีดกั้น */}
            <div className="border-t-2 border-gray-300 mt-6 md:mt-10"></div>

            <Footer />
        </div>
    );
};

export default ArkadERV;