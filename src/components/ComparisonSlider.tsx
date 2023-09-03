"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import oldCar from "@/assets/images/comparison-slider/old.webp";
import newCar from "@/assets/images/comparison-slider/new.webp";
import Link from "next/link";
import gallery1 from "@/assets/images/gallery/gallery1.webp";
import gallery2 from "@/assets/images/gallery/gallery2.webp";
import gallery3 from "@/assets/images/gallery/gallery3.webp";

const ComparisonSlider = () => {
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    if (imgRef.current) {
      imgRef.current.style.clipPath =
        "polygon(0 0," + newValue + "% 0," + newValue + "% 100%, 0 100%)";
    }
    if (lineRef.current) {
      lineRef.current.style.left = newValue + "%";
    }
  };

  const handleClickSlider = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className=" bg-[#171717] py-10">
      <div className="w-[1200px] mx-auto py-5">
        <h2 className="mb-10">
          <span className="font-light">HƠN CẢ MỘT CHIẾC GHẾ DA</span> <br />
          <span className="font-bold">
            HÃY CHIÊM NGƯỠNG SỰ ĐẲNG CẤP CỦA LAVOR
          </span>
        </h2>
        <div className="h-[800px] bg-black relative">
          <Image
            src={oldCar}
            alt="old car"
            className="w-full h-full absolute"
          />
          <Image
            src={newCar}
            alt="new car"
            className="w-full h-full absolute"
            id="old-car-img"
            ref={imgRef}
          />
          <p
            className={`${
              isDragging
                ? "bg-primary after:border-[6px] after:border-solid after:border-primary"
                : "bg-white after:border-[6px] after:border-solid after:border-white"
            } cd-line cursor-move`}
            ref={lineRef}
          ></p>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={onSliderChange}
            className="comparison-slider"
            onClick={handleClickSlider}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
