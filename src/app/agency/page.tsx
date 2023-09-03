import Image from "next/image";
import React from "react";
import map from "@/assets/images/map.png";

const Agency = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="wrapper grid grid-cols-2 gap-10 py-40">
        <div></div>
        <div>
          <Image alt="Đại lý toàn quốc" src={map} />
        </div>
      </div>
    </div>
  );
};

export default Agency;
