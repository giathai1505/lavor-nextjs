import Image from "next/image";
import React from "react";
import startImg from "@/assets/images/common/start-circle-button.png";

interface IProgressBar {
  active: number;
}

const ProgressBar: React.FC<IProgressBar> = ({ active }) => {
  const activeWith = (100 * active) / 3;
  return (
    <div className="w-[300px] md:w-[500px] py-4 relative">
      <div className="h-2 rounded-full bg-white"></div>
      <div
        className={`absolute  h-2 rounded-full bg-primary top-1/2 -translate-y-1/2 `}
        style={{ width: `${activeWith}%` }}
      ></div>
      <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
        {new Array(4).fill(null).map((_, index) => {
          return (
            <div
              className={`dot ${index <= active ? "bg-primary" : "bg-white"}`}
              key={index}
            ></div>
          );
        })}
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24">
        <Image src={startImg} alt="bắt đầu" />
      </div>

      <span
        className={`progress-title left-[28%] md:left-[30%] ${
          1 <= active ? "show" : ""
        }`}
      >
        Chọn xe
      </span>
      <span
        className={`progress-title left-[53%] md:left-[58%] ${
          2 <= active ? "show" : ""
        }`}
      >
        Chọn thiết kế
      </span>
      <span
        className={`progress-title right-[-24px] translate-x-[-20px] ${
          3 <= active ? "show" : ""
        }`}
      >
        liên hệ
      </span>
    </div>
  );
};

export default ProgressBar;
