import React from "react";
import Breadcrumb from "./Breadcrumb";

interface IPartHeader {
  title: string;
  backgroundImage: string;
  breadcrumb: string;
}

const PartHeader: React.FC<IPartHeader> = ({
  title,
  backgroundImage,
  breadcrumb,
}) => {
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
