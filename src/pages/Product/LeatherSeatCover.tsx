import Image from "next/image";
import Link from "next/link";
import React from "react";
import startButton from "@/assets/images/common/start-now-button.png";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import { bocGheDa } from "@/assets/staticData";

const LeatherSeatCover = () => {
  return (
    <div className="p-5 md:p-10 xl:px-0 xl:py-10">
      <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
        <span>Bọc ghế da</span>
      </h2>
      <p className="m-0 mb-14 text-base text-white text-center max-w-3xl mx-auto">
    Dưới đây là một số mẫu bọc ghế da
        đã được thực hiện tại Lavor. Các bạn có thể tham khảo để dễ dàng tạo ra
        thiết kế cho riêng mình nhé!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {bocGheDa.map((item) => {
          return (
            <div key={item.id}>
              <div className="h-[200px] w-[350px] mx-auto ">
                <YoutubeThumbnail
                  imgAlt={item.videoThumbnail.alt}
                  imgSrc={item.videoThumbnail.image}
                  title={item.videoThumbnail.title}
                  link={item.videoThumbnail.url}
                />
              </div>
              <p className="uppercase text-center text-primary mt-2 text-xl">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-14 flex justify-center">
        <Link href="/thiet-ke">
          <Image
            src={startButton}
            alt="Chọn thiêt kế riêng cuả bạn"
            className="w-80 start-button"
          />
        </Link>
      </div>
    </div>
  );
};

export default LeatherSeatCover;
