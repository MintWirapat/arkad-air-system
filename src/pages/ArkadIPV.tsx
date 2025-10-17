// src/pages/ArkadIPV.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../components/Navbar.tsx";
import ProductNavBar from "../components/ProductNavBar.tsx";
import Footer from "../components/Footer.tsx";

const ArkadIPV: React.FC = () => {
    const images = [
        require("../images/ArkadIPV.png"),
    ];

    const [current, setCurrent] = useState(0);
    const [selectedModel, setSelectedModel] = useState("Arkad IPV");
    const models = ["Arkad IPV"];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ProductNavBar />

            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 text-sm text-gray-600">
                    <Link to="/" className="hover:text-gray-900 flex items-center">
                        <Home size={16} className="mr-1" />
                        Home
                    </Link>
                    <ChevronRight size={16} />
                    <Link to="/" className="hover:text-gray-900">
                        Products
                    </Link>
                    <ChevronRight size={16} />
                    <span className="text-gray-900 font-medium">Arkad IPV</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="bg-white rounded-2xl shadow-md">
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="relative flex items-center justify-center">
                            <div>
                                <img src={images[current]} alt="Arkad IPV" className="w-full max-h-[420px] object-contain rounded-xl transition-all duration-500 drop-shadow-lg" />
                            </div>
                        </div>

                        <div className="flex flex-col text-left">
                            <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-1">
                                เครื่องเติมอากาศสะอาดแบบติดตั้งภายใน <br /> Arkad IPV
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                (Arkad Indoor Positive Pressure Ventilation)
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-white rounded-xl border flex">
                                    <div className="px-6 py-3 shadow-sm">
                                        <span className="text-3xl font-semibold text-[#00AEEF]">Coming Soon...</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3 กล่องข้อมูล */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1 flex items-center gap-3   p-3 border-r border-black text-center  ">
                                    <img
                                        src={require("../images/iconarea.png")}
                                        alt="พื้นที่ใช้งาน"
                                        className="w-10 h-10 object-contain"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">พื้นที่ใช้งาน</p>
                                        <p className="text-lg font-semibold">32 </p>
                                        <p className="text-lg text-gray-500">ตารางเมตร</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex items-center gap-3  p-3 border-r border-black  text-center">
                                    <img
                                        src={require("../images/filtericon.png")}
                                        alt="ระบบกรอง"
                                        className="w-10 h-10 object-contain"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">ระบบกรองอากาศ</p>
                                        <p className="text-sm font-semibold">2 ชั้น </p>
                                        <p className="text-sm text-gray-500 ">Pre Filter Carbon FilterHEPA H13</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex items-center gap-3  p-3   text-center">
                                    <img
                                        src={require("../images/touchscreen.png")}
                                        alt="Application"
                                        className="w-10 h-10 object-contain"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">Application</p>
                                        <p className="text-sm text-black">แอป Arkad</p>
                                        <p className="text-sm text-gray-500 ">ควบคุมอุปกรณ์เช็คคุณภาพอากาศทำได้ทุกที่ ทุกเวลา</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="flex justify-center gap-6 mb-8 flex-wrap">
                            {models.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSelectedModel(m)}
                                    className={`px-8 py-3 rounded-full border text-base transition ${selectedModel === m ? "border-blue-500 text-blue-600 font-semibold" : "border-gray-300 text-gray-700 hover:border-gray-400"
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <button className="w-full max-w-3xl bg-[#00AEEF] text-white font-semibold py-4 rounded-full hover:bg-[#0098d6] transition text-center">
                            COMING SOON...
                        </button>
                    </div>
                </div>
            </div>



            <div className="border-t-2 border-gray-300 mt-10"></div>
            <Footer />
        </div >
    );
};

export default ArkadIPV;