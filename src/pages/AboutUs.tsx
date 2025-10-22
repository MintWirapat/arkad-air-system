import React from 'react';
import Footer from '../components/Footer.tsx';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">


            {/* Hero Section - ใช้รูปภาพแบบเต็มหน้าจอ ไม่มีข้อความ */}
            <div className="relative w-full">
                <img
                    src={require("../images/9.png")}
                    alt="Hero Background"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* About Us Content */}
            <div className="flex-grow bg-white py-8 mt-[-20px]">  
                 <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl  text-center text-blue-600 mb-8">
                        About Us
                    </h2>

                    {/* Company Description */}
                    <div className="text-center mb-12">
                        <p className="text-xl  text-gray-800 mb-3">
                            บริษัท วินเซนต์ ออโตเมชั่น จำกัด
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl mx-auto">
                            เราประกอบธุรกิจจำหน่ายอุปกรณ์บำบัดอากาศสะอาดด้วยระบบแรงดันบวกบริการติดตั้งดูแลรักษา
                            ปรึกษาทางด้านระบบบำบัดอากาศให้กับที่พักอาศัยทั่วไป องค์กร บริษัท หน่วยงานราชการ
                            มุ่งเน้นการพัฒนาสินค้าเพื่อให้ผู้ใช้งานได้รับสินค้าที่มีคุณภาพ รวมถึงแพลตฟอร์มแอพพลิเคชั่น
                            เพื่อตอบโจทย์การใช้งานในทุกๆด้าน
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-8 max-w-3xl mx-auto">
                        {/* 2563 */}
                        <div className="">
                            <h3 className="text-xl  text-gray-800 mb-3">2563</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ก่อตั้ง บริษัท วินเซนต์ ออโตเมชั่น จำกัด โดยประกอบธุรกิจจำหน่ายอุปกรณ์บำบัดอากาศสะอาดด้วยระบบความดันบวก PPV (Positive Pressure Air Purifier)
                                โดยเริ่มจากการออกแบบและติดตั้งระบบเครื่องสร้างอากาศสะอาดให้กับที่พักอาศัยทั่วไป
                            </p>
                        </div>

                        {/* 2564 */}
                        <div className="">
                            <h3 className="text-xl  text-gray-800 mb-3">2564</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ออกแบบผลิตภัณฑ์ระบบสร้างแรงดันบวกแบบหมุนเวียนอากาศ ERV (Energy Recover Ventilation) ที่ผ่านการทดสอบมาตรฐานการกรองอากาศจาก
                                หน่วยวิจัยสนามไฟฟ้าประยุกต์ในงานวิศวกรรมมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา (RUEE LAB)
                            </p>
                        </div>

                        {/* 2565 */}
                        <div className="">
                            <h3 className="text-xl  text-gray-800 mb-3">2565</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ทางบริษัทได้สร้างพันธมิตรในการจำหน่ายสินค้าและผลิตภัณฑ์ให้ครอบคลุมทุกพื้นที่เพื่อตอบสนองความสะดวกสบายของลูกค้า
                            </p>
                        </div>

                        {/* 2566 - ปัจจุบัน */}
                        <div className="">
                            <h3 className="text-xl  text-gray-800 mb-3">2566 - ปัจจุบัน</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                พัฒนาเทคโนโลยีการเชื่อมต่อระหว่างผลิตภัณฑ์และมือถือเพื่อให้ลูกค้าสามารถเข้าถึงข้อมูลคุณภาพอากาศภายในบ้าน
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