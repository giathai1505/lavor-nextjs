import { amazingCar } from "@/assets/staticData";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import startButton from "@/assets/images/common/start-now-button.png";
import Each from "@/lib/Each";

const renderYouTubeVideo = (youtube: any) => {
  return (
    <div
      className="h-[200px] w-[350px] mx-auto md:h-[350px] md:w-[600px] xl:w-[350px] xl:h-[200px]"
      key={youtube.id}
    >
      <YoutubeThumbnail
        imgAlt={youtube.alt}
        imgSrc={youtube.src}
        embedId={youtube.embedId}
        title={youtube.title}
      />
    </div>
  );
};

const SampleVideos = () => {
  return (
    <div className="bg-secondaryBackground py-10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
          NHỮNG <span>TUYỆT PHẨM</span> ĐƯỢC NÂNG CẤP TẠI <span>LAVOR</span>
        </h2>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-3 xl:my-20">
          <Each of={amazingCar} render={(item) => renderYouTubeVideo(item)} />
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
