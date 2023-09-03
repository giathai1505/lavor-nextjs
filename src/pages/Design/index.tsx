import ProgressBar from "@/components/ProgressBar";
import React from "react";

const Design = () => {
  return (
    <div className="design-wrapper ">
      <div className=" bg-black pb-40">
        <h2 className="pt-[200px]">
          <span>CHỌN DÒNG XE BẠN ĐANG SỞ HỮU</span>
        </h2>
      </div>
      <div className="wrapper py-10">
        <div className="flex justify-center">
          <ProgressBar active={3} />
        </div>
      </div>
    </div>
  );
};

export default Design;
