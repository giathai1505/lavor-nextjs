import { StaticImageData } from "next/image";
import React from "react";

interface IPartHeader {
  title: string;
  backgroundImage: string;
}

const PartHeader: React.FC<IPartHeader> = ({ title, backgroundImage }) => {
  return (
    <div className="relative h-[250px]">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className=" header-bg absolute w-full h-full"
      ></div>
      <h2 className="absolute z-20 mt-[150px] font-bold">
        <span> {title}</span>
      </h2>
    </div>
  );
};

export default PartHeader;
