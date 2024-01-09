import { amazingCar } from "@/assets/staticData";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import startButton from "@/assets/images/common/start-now-button.png";

const SampleVideos : React.FC = () => {
  return (
    <div className="bg-secondaryBackground py-10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
          NHỮNG <span>TUYỆT PHẨM</span> ĐƯỢC NÂNG CẤP TẠI <span>LAVOR</span>
        </h2>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-3 xl:my-20">
          {amazingCar.map((item) => {
            return (
              <div
                className="h-[200px] w-[350px] mx-auto md:h-[350px] md:w-[600px] xl:w-[350px] xl:h-[200px]"
                key={item.id}
              >
                <YoutubeThumbnail
                  imgAlt={item.alt}
                  imgSrc={item.src}
                  embedId={item.embedId}
                  title={item.title}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
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

export default SampleVideos;
