import React from "react";
import Breadcrumb from "./Breadcrumb";
import { StaticImageData } from "next/image";

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
    <div className="relative h-[180px] md:h-[250px]">
      <img
        alt="Ảnh nền header"
        src={backgroundImage.src}
        className="absolute object-cover"
        fetchPriority="high"
        decoding="async"
        data-nimg="fill"
        style={{position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent"}}
      />

      <div className="header-bg"></div>

      <div className="absolute z-20 mt-[80px] md:mt-[140px] left-1/2 -translate-x-2/4">
        <h2 className="mb-2 text-xl whitespace-nowrap leading-8 md:text-2xl xl:leading-[48px]">
          <span> {title}</span>
        </h2>
        <Breadcrumb text={breadcrumb}/>
      </div>
    </div>
  );
};

export default PartHeader;
