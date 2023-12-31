"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { categories } from "@/assets/staticData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

type TCategorySliderProps = {
  slidesPerView: number;
};

const CategorySlider: React.FC<TCategorySliderProps> = ({ slidesPerView }) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {categories.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <div className="pb-2" key={item.id}>
              <div className="category-slider-item-wrapper ">
                <Image
                  src={item.icon}
                  alt="Product image"
                  className="w-full h-full object-cover"
                />

                <Link href={item.href} className="category-slider-item-desc">
                  <FaPlusCircle className="w-10 h-10 mb-3" />
                  <p className="text-center text-lg">{item.desc}</p>
                </Link>
              </div>
              <Link href={item.href} className="font-bold block">
                <p className="category-name">{item.name}</p>
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CategorySlider;
