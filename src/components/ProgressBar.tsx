import Image from "next/image";
import React from "react";
import startImg from "@/assets/images/start-circle.png";

interface IProgressBar {
  active: number;
}

const ProgressBar: React.FC<IProgressBar> = ({ active }) => {
  let activeWith = (100 * active) / 3;
  let dotArray = [1, 2, 3, 4];
  return (
    <div className="w-[500px] py-4 relative">
      <div className="h-2 rounded-full bg-black"></div>
      <div
        className={`absolute  h-2 rounded-full bg-primary top-1/2 -translate-y-1/2 `}
        style={{ width: `${activeWith}%` }}
      ></div>
      <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
        {dotArray.map((item, index) => {
          return (
            <div
              className={`dot ${index <= active ? "bg-primary" : "bg-black"}`}
            ></div>
          );
        })}
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24">
        <Image src={startImg} alt="bắt đầu" />
      </div>

      <span
        className={`progress-title left-[33%] ${1 <= active ? "show" : ""}`}
      >
        Chọn xe
      </span>
      <span
        className={`progress-title left-[60%] ${2 <= active ? "show" : ""}`}
      >
        Chọn thiết kế
      </span>
      <span
        className={`progress-title right-0 translate-x-[-20px] ${
          3 <= active ? "show" : ""
        }`}
      >
        liên hệ
      </span>
    </div>
  );
};

export default ProgressBar;
