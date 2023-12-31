import Image from "next/image";
import Link from "next/link";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import startButton from "@/assets/images/common/start-now-button.png";
import introduceImg from "@/assets/images/youtubeThumbnail/aboutUs/introduce.webp";
import React from "react";

const Part2: React.FC = () => {
  return (
    <div className="bg-secondaryBackground p-5 md:p-10 xl:p-16">
      <div className="wrapper">
        <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
          Chọn chiếc xe của bạn - còn lại để <span>Lavor</span> lo
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10">
          <div className="text-white text-base md:text-lg mb-5 md:mb-10 text-center">
            <p>
              1. Bạn chỉ cần tìm chiếc xe của mình bằng cách chọn năm sản xuất,
              hãng xe, dòng xe sau đó nhấn tiếp tục để chọn thiết kế riêng của
              bạn.
            </p>
            <br />
            <p>
              2. Hãy để lại thông tin liên hệ. Những chuyên viên của Lavor sẽ
              liên hệ với bạn để tư vấn cụ thể hơn về thiết kế cũng như giá và
              lên lịch nâng cấp nội thất xe giúp bạn.
            </p>
            <br />
            <p>
              3. Lavor sẽ tiến hành nâng cấp nội thất xe và mang đến bất ngờ cho
              bạn
            </p>
          </div>
          <div className="h-[200px] w-[350px] mx-auto mb-5 md:mb-10 md:h-[350px] md:w-[600px] xl:h-[220px] xl:w-[400px]">
            <YoutubeThumbnail
              imgAlt="Hướng dẫn lắp đặt bộ massage 3 chức năng"
              imgSrc={introduceImg}
              title="Hướng dẫn lắp đặt bộ Massage 3 chức năng - Lavor"
              embedId="WxabGfI3CVk?si=yZ1hAl9hVjLVnQLN"
            />
          </div>
        </div>
        <div className="mt-5 md:mt-10 flex justify-center">
          <Link href="/thiet-ke">
            <Image
              src={startButton}
              alt="Chọn thiêt kế riêng cuả bạn"
              className="w-80 start-button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Part2;
