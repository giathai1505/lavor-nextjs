"use client";

import React, {useRef, useState} from "react";
import oldCar from "@/assets/images/comparison-slider/old.webp";
import newCar from "@/assets/images/comparison-slider/new.webp";

const DEFAULT_SLIDER_VALUE: number = 50;

const ComparisonSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(DEFAULT_SLIDER_VALUE);
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
    <div className=" bg-black">
      <div className="w-full mx-auto p-5 md:p-10">
        <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
          <span className="font-light">HƠN CẢ MỘT CHIẾC GHẾ DA</span> <br/>
          <span className="font-bold">
            HÃY CHIÊM NGƯỠNG SỰ ĐẲNG CẤP CỦA LAVOR
          </span>
        </h2>
        <div
          className="mx-auto bg-black relative h-[360px] w-[330px] md:h-[570px] md:w-[700px] xl:w-[900px] xl:h-[750px]">
          <div className="w-full h-full flex">
            <img
              src={oldCar.src}
              alt="Hình ảnh xe trước khi được Lavor lột xác"
              className="w-full h-full absolute object-cover"
              loading="eager"
              fetchPriority="high"
              data-nimg="1"
              width="2000"
              height="1500"
              decoding="async"
            />
            <img
              src={newCar.src}
              alt="Hình ảnh xe sau khi được Lavor lột xác"
              className="w-full h-full absolute object-cover"
              id="old-car-img"
              ref={imgRef}
              loading="eager"
              fetchPriority="high"
              data-nimg="1"
              width="2000"
              height="1500"
              decoding="async"
            />
          </div>

          <p
            className={`${
              isDragging
                ? "bg-primary after:border-[6px] after:border-solid after:border-primary"
                : "bg-white after:border-[6px] after:border-solid after:border-white"
            } cd-line cursor-move`}
            ref={lineRef}
          ></p>
          <div className="absolute top-0 w-full">
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={onSliderChange}
              className="comparison-slider"
              aria-label="comparision slider"
              onClick={handleClickSlider}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
