"use client";
import { carouseSliderImages } from "@/assets/staticData";
import React, { useEffect, useRef, useState } from "react";
import startNowButton from "@/assets/images/common/start-now-button.png";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { getWindowDimensions, indexArray } from "@/utilities/commonUtilities";

const DEFAULT_DESKTOP_SCREEN_WIDTH = 1920;
const TOTAL_SLIDER = 3;

const HomeCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [left, setLeft] = useState<number>(0);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMoveSlideLeft = () => {
    if (activeSlide > 1) {
      setActiveSlide((pre) => pre - 1);
    } else {
      setActiveSlide(1);
    }
  };

  const handleMoveSlideRight = () => {
    if (activeSlide < TOTAL_SLIDER) {
      setActiveSlide((pre) => pre + 1);
    } else {
      setActiveSlide(TOTAL_SLIDER);
    }
  };

  useEffect(() => {
    const screenWidth =
      getWindowDimensions().width ?? DEFAULT_DESKTOP_SCREEN_WIDTH;

    const newLeft = -screenWidth * (activeSlide - 1);
    setLeft(newLeft);
  }, [activeSlide]);

  return (
    <div className="carousel-wrapper" ref={carouselWrapperRef}>
      <MdOutlineKeyboardArrowLeft
        className="carouselArrow left"
        onClick={handleMoveSlideLeft}
      />
      <MdOutlineKeyboardArrowRight
        className="carouselArrow right"
        onClick={handleMoveSlideRight}
      />
      <div className="carousel-dot-wrapper">
        {indexArray(3).map((item) => {
          return (
            <div
              className={`carousel-dot-item ${
                activeSlide === item ? "active" : ""
              }`}
              key={item}
            ></div>
          );
        })}
      </div>
      <div className="home-text-wrapper hidden xl:block">
        <div className="home-text">
          <p className="relative pb-3 leading-10 text-xl">
            <span className="font-bold text-2xl">ĐẲNG CẤP HƠN VỚI LAVOR!</span>
          </p>
          <p className="text-white text-lg">
            Bạn muốn nâng tầm, làm mới nội thất xe của mình?
          </p>
        </div>

        <Link href="/thiet-ke" className="relative mt-2">
          <Image
            alt="choose your design"
            src={startNowButton}
            className="start-button w-[500px] mr-[100px]"
          />
        </Link>
      </div>
      <div className="carousel-slider-wrapper">
        <div
          className="inline-flex relative h-full"
          style={{ left: `${left}px` }}
        >
          {carouseSliderImages.map((item, index) => {
            return (
              <div className="carousel-slider-item" key={item.src.toString()}>
                <Image
                  alt="Slider ảnh"
                  loading="eager"
                  src={item}
                  priority={index === 0 ? true : false}
                  className="w-full h-full object-cover"
                  placeholder="blur"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
