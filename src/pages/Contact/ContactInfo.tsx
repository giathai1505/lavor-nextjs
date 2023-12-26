import React from "react";
import { GoLocation } from "react-icons/go";
import { PiHouseLight } from "react-icons/pi";
import { AiOutlinePhone, AiOutlineGlobal } from "react-icons/ai";
import { CiMail, CiFacebook } from "react-icons/ci";

const ContactInfo = () => {
  return (
    <div>
      <h3 className="mb-5 text-[22px] leading-8">
        LAVOR LUXURY - <br></br>THƯƠNNG HIỆU THIẾT KẾ & <br /> SẢN XUẤT NỘI THẤT
        OTÔ
      </h3>
      <div className="text-white flex flex-col gap-4 mb-10">
        <div className="flex items-center gap-2">
          <GoLocation className="text-primary" />
          <span>
            Địa chỉ: Lô 1A, KCN Dươnng Liễu, xa Dương Liễu, H.Hoài Đức, TP Hà
            Nội
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PiHouseLight className="text-primary" />
          <span>
            VPGD: Chi nhánh miền Nam: 33 Đường 29, Khu đô thị Vạn Phúc, Thủ Đức,
            TP. Hồ Chí Minh
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlinePhone className="text-primary" />
          <span>Hotline: 1900 234 556</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineGlobal className="text-primary" />
          <span>Webiste: Lavorluxury.com</span>
        </div>
        <div className="flex items-center gap-2">
          <CiFacebook className="text-primary" />
          <span>Fanpage: Lavor Luxury</span>
        </div>
        <div className="flex items-center gap-2">
          <CiMail className="text-primary" />
          <span>Email: info@lavorluxury.com</span>
        </div>
      </div>
      <div className="hidden xl:block">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5842773317713!2d106.70463137685846!3d10.843092157956834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ba0c7fe295%3A0xbaf26a50da656cf4!2sLavor%20Luxury%20-%20Chi%20Nh%C3%A1nh%20Mi%E1%BB%81n%20Nam!5e0!3m2!1svi!2s!4v1696072370001!5m2!1svi!2s"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
