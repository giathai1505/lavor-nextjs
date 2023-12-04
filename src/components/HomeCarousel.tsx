"use client";

import { carouseSliderImages } from "@/data/homePage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const HomeCarousel = () => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [left, setLeft] = useState<number>(0);

  const handleMoveSlideLeft = () => {
    if (activeSlide > 1) {
      setActiveSlide((pre) => pre - 1);
    } else {
      setActiveSlide(1);
    }
  };

  const handleMoveSlideRight = () => {
    if (activeSlide < 3) {
      setActiveSlide((pre) => pre + 1);
    } else {
      setActiveSlide(3);
    }
  };

  useEffect(() => {
    // const timeID = setInterval(() => {
    //   if (activeSlide === 3) {
    //     setActiveSlide(1);
    //   } else {
    //     setActiveSlide((pre) => pre + 1);
    //   }
    // }, 3000);
    // return () => {
    //   clearInterval(timeID);
    // };
  }, []);

  useEffect(() => {
    const newLeft = -1920 * (activeSlide - 1);
    setLeft(newLeft);
  }, [activeSlide]);

  return (
    <div className="carousel-wrapper">
      <MdOutlineKeyboardArrowLeft
        className="carouselArrow left"
        onClick={handleMoveSlideLeft}
      />
      <MdOutlineKeyboardArrowRight
        className="carouselArrow right"
        onClick={handleMoveSlideRight}
      />
      <div className="carousel-dot-wrapper">
        {[1, 2, 3].map((item) => {
          return (
            <div
              className={`carousel-dot-item ${
                activeSlide === item ? "active" : ""
              }`}
            ></div>
          );
        })}
      </div>

      <div className="carousel-slider-wrapper">
        <div
          className="inline-flex relative h-full"
          style={{ left: `${left}px` }}
        >
          {carouseSliderImages.map((item) => {
            return (
              <div className="carousel-slider-item bg-yellow-200">
                <Image
                  alt=""
                  src={item}
                  className="w-full h-full object-cover"
                  placeholder="blur"
                />
              </div>
            );
          })}

          <div className="carousel-slider-item bg-blue-300"></div>
          <div className="carousel-slider-item bg-green-300"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
