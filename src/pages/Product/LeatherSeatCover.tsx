import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import startButton from "@/assets/images/start-now-button.png";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import { bocGheDa } from "@/data/products";

const LeatherSeatCover = () => {
  return (
    <div>
      <h2 className="mb-3">
        <span>Bọc ghế da</span>
      </h2>
      <p className="m-0 mb-14 text-base text-white text-center max-w-3xl mx-auto">
        Sơ đồ cấu trúc Website Lavor 100% C7 Dưới đây là một số mẫu bọc ghế da
        đã được thực hiện tại Lavor. Các bạn có thể tham khảo để dễ dàng tạo ra
        thiết kế cho riêng mình nhé!
      </p>
      <div className="grid grid-cols-3 gap-20">
        {bocGheDa.map((item) => {
          return (
            <div key={item.id}>
              <div className="h-[200px]">
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
      <div className="mt-20 flex justify-center">
        <Link href="/">
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
