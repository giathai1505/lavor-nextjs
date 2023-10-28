import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import React from "react";
import introduceImg from "@/assets/images/youtubeThumbnail/aboutUs/2.png";

const Part3 = () => {
  return (
    <div className="bg-black py-14">
      <div className="wrapper">
        <h2 className="mb-10">
          QUY TRÌNH SẢN XUẤT VÀ LẮP ĐẶT ĐỘC QUYỀN CỦA <span>LAVOR</span>
        </h2>
        <div className="flex flex-col justify-center gap-10 items-center">
          <div className="text-white">
            <p>
              Nội thất da Lavor chỉ được lắp đặt tại 2 cơ sở chính thức của
              chúng tôi tại Hà Nội và Thành phố Hồ Chí Minh. Tại đó, đội ngũ
              chuyên viên, kỹ thuật viên của chúng tôi được đào tạo đặc biệt, có
              tay nghề tốt. Họ được trang bị các công cụ, thiết bị và bí quyết
              để thực hiện lắp đặt, đảm bảo xử lý ghế, chi tiết và toàn bộ các
              thiết bị điện tử liên quan trong nội thất xe của bạn.
              <br />
              <br />
              Bên cạnh đó, chúng tôi còn có mạng lưới ... đại lý trên toàn quốc.
              Tại đây, Lavor luôn sẵn sàng cung cấp cho các bạn những sản phẩm
              như: gối cổ, bọc tay lái, thảm sàn,...
            </p>
          </div>
          <div>
            <div className="w-[800px] h-[450px]">
              <YoutubeThumbnail
                imgAlt="Giới thiệu phân xưởng Lavor"
                imgSrc={introduceImg}
                link="https://www.youtube.com/watch?v=nV7IIKJYZik&t=28s"
                title="Phân xưởng sản xuất nội thất ô tô hàng đầu Việt Nam có gì? | Lavor Luxury"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
