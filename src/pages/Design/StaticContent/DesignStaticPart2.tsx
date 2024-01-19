import Image from 'next/image'
import React from 'react'
import LavorFactoryImage from "@/assets/images/common/lavor-fatory.webp";
import Button from "@/components/Common/Button";

const DesignStaticPart2 = () => {
  return (
    <div className="home-leather py-5">
    <div className="container mx-auto max-w-[1200px] p-5 md:p-10">
      <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
        LỘT XÁC NỘI THẤT CÙNG <br />
        <span>LAVOR</span>
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10">
        <div className=" mx-auto mb-5 md:mb-10">
          <Image
            alt="Công xưởng Lavor"
            src={LavorFactoryImage}
            loading="eager"
            className="rounded-xl border-[6px] border-solid border-white xl:h-[300px] h-[200px] md:h-[350px] md:w-[600px] w-[350px] xl:w-[500px] object-cover"
          />
        </div>
        <div className="leather-text text:base md:text-lg">
          <p className="mb-3 text-justify md:mb-5 xl:text-left">
            Lavor là thương hiệu hàng đầu Việt Nam về sản xuất các sản phẩm
            liên quan đến da cho nội thất ô tô. Chúng tôi đáp ứng mọi mong
            đợi của khách hàng từ phổ thông đến khác biệt nhất.
          </p>
          <p className="text-justify xl:text-left">
            Lavor tự hào với sự kết hợp cùng vị vua ngành da Mastrotto từ Ý
            và phụ liệu Amann hàng đầu từ Đức. Bên cạnh đó, Lavor sở hữu đội
            ngũ chuyên gia và kỹ thuật viên giàu kinh nghiệm, các kỹ sư có
            tuổi nghề lên tới 30 năm, luôn được đào tạo nâng cao nhằm đáp
            ứng các tiêu chuẩn phức tạp cũng như xu hướng của thị trường nội
            địa và quốc tế. Các sản phẩm liên quan tới da và bọc ghế da tại
            Lavor rất đa dạng như: Nệm ghế da ô tô, sàn xe, thảm lót chân,
            gối cổ, bọc tay lái...
          </p>
        </div>
      </div>
      <div className="mt-10">
        <Button link="/ve-chung-toi" text="Tìm hiểu thêm" />
      </div>
    </div>
  </div>
  )
}

export default DesignStaticPart2