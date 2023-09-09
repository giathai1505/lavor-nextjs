import React from "react";

const Part3 = () => {
  return (
    <div className="bg-black py-20">
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
            <iframe
              src="https://www.youtube.com/embed/YeRwL8ET11g"
              title="Phân xưởng sản xuất nội thất ô tô hàng đầu Việt Nam có gì? | Lavor Luxury"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-[800px] h-[400px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part3;
