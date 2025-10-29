import React from 'react';
import Footer from '../components/Footer.tsx';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Hero Section - เพิ่ม padding-top เพื่อไม่ให้ติด Navbar */}
            <div className="relative w-full pt-14 md:pt-16">
                <img
                    src={require("../images/9.png")}
                    alt="Hero Background"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* About Us Content */}
            <div className="flex-grow bg-white py-8 md:py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-8 md:mb-12">
                        About Us
                    </h2>

                    {/* Company Description */}
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                            บริษัท วินเซนต์ ออโตเมชั่น จำกัด
                        </p>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                            เราประกอบธุรกิจจำหน่ายอุปกรณ์บำบัดอากาศสะอาดด้วยระบบแรงดันบวกบริการติดตั้งดูแลรักษา
                            ปรึกษาทางด้านระบบบำบัดอากาศให้กับที่พักอาศัยทั่วไป องค์กร บริษัท หน่วยงานราชการ
                            มุ่งเน้นการพัฒนาสินค้าเพื่อให้ผู้ใช้งานได้รับสินค้าที่มีคุณภาพ รวมถึงแพลตฟอร์มแอพพลิเคชั่น
                            เพื่อตอบโจทย์การใช้งานในทุกๆด้าน
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
                        {/* 2563 */}
                        <div className="pb-6 border-b border-gray-200">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">2563</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                ก่อตั้ง บริษัท วินเซนต์ ออโตเมชั่น จำกัด โดยประกอบธุรกิจจำหน่ายอุปกรณ์บำบัดอากาศสะอาดด้วยระบบความดันบวก PPV (Positive Pressure Air Purifier)
                                โดยเริ่มจากการออกแบบและติดตั้งระบบเครื่องสร้างอากาศสะอาดให้กับที่พักอาศัยทั่วไป
                            </p>
                        </div>

                        {/* 2564 */}
                        <div className="pb-6 border-b border-gray-200">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">2564</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                ออกแบบผลิตภัณฑ์เครื่องเติมอากาศสะอาดแบบหมุนเวียนอากาศ ERV (Energy Recover Ventilation) <br /> ที่ผ่านการทดสอบมาตรฐานการกรองอากาศจาก <br />
                                หน่วยวิจัยสนามไฟฟ้าประยุกต์ในงานวิศวกรรมมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา (RUEE LAB)
                            </p>
                        </div>

                        {/* 2565 */}
                        <div className="pb-6 border-b border-gray-200">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">2565</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                ทางบริษัทได้สร้างพันธมิตรในการจำหน่ายสินค้าและผลิตภัณฑ์ให้ครอบคลุมทุกพื้นที่ <br />
                                เพื่อตอบสนองความสะดวกสบายของลูกค้า
                            </p>
                        </div>

                        {/* 2566 - ปัจจุบัน */}
                        <div className="pb-6">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">2566 - ปัจจุบัน</h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                พัฒนาเทคโนโลยีการเชื่อมต่อระหว่างผลิตภัณฑ์และมือถือเพื่อให้ลูกค้าสามารถเข้าถึงข้อมูลคุณภาพอากาศภายในบ้าน <br />
                                ควบคุมผลิตภัณฑ์ Arkad และติดตามคุณภาพอากาศโดยรวมในประเทศ
                            </p>
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

export default AboutUs;