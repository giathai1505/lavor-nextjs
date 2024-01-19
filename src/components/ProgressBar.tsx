import Image from "next/image";
import React from "react";
import startImg from "@/assets/images/common/start-circle-button.webp";
import { EDesignPhase } from "@/types/type";
import { indexArray } from "@/utilities/commonUtilities";
import { useDesignContext } from "@/context/DesignContext";

const TOTAL_PHASE: number = 3;



const ProgressBar= () => {
  const {phase} = useDesignContext()
  const activeWith = (100 * phase) / TOTAL_PHASE;

  return (
    <div className="w-[250px] md:w-[500px] py-4 relative">
      <div className="h-2 rounded-full bg-white"></div>
      <div
        className={`absolute  h-2 rounded-full bg-primary top-1/2 -translate-y-1/2 `}
        style={{ width: `${activeWith}%` }}
      ></div>
      <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2">
        {indexArray(4).map((item) => {
          return (
            <div
              className={`dot ${
                item - 1 <= phase ? "bg-primary" : "bg-white"
              }`}
              key={item}
            ></div>
          );
        })}
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-24">
        <Image src={startImg} alt="bắt đầu" />
      </div>

      <span
        className={`progress-title text-[10px] md:text-sm left-[28%] md:left-[30%] ${
          EDesignPhase.CHOOSE_CAR <= phase ? "show" : ""
        }`}
      >
        Chọn xe
      </span>
      <span
        className={`progress-title text-[10px] md:text-sm  left-[53%] md:left-[58%] ${
          EDesignPhase.CHOOSE_DESIGN <= phase ? "show" : ""
        }`}
      >
        Chọn thiết kế
      </span>
      <span
        className={`progress-title text-[10px] md:text-sm  right-[-24px] translate-x-[-20px] ${
          EDesignPhase.CONCLUSION <= phase ? "show" : ""
        }`}
      >
        liên hệ
      </span>
    </div>
  );
};

export default ProgressBar;
