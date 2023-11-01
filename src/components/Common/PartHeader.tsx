import React from "react";
import Breadcrumb from "./Breadcrumb";
import Image, { StaticImageData } from "next/image";

interface IPartHeader {
  title: string;
  backgroundImage: StaticImageData;
  breadcrumb: string;
}

const PartHeader: React.FC<IPartHeader> = ({
  title,
  backgroundImage,
  breadcrumb,
}) => {
  return (
    <div className="relative h-[250px]">
      <Image
        alt="Ảnh nền header"
        src={backgroundImage}
        fill
        className="absolute object-cover"
        placeholder="blur"
      />

      <div className="header-bg"></div>

      <div className="absolute z-20 mt-[130px] left-1/2 -translate-x-2/4">
        <h2 className=" font-bold mb-3 text-2xl">
          <span> {title}</span>
        </h2>
        <Breadcrumb text={breadcrumb} />
      </div>
    </div>
  );
};

export default PartHeader;
