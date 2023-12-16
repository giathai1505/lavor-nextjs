"use client";
import React from "react";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { categories } from "@/assets/staticData";

interface IProductSliderInterface {}

const CategorySlider: React.FC<IProductSliderInterface> = () => {
  return (
    <div className="relative">
      <div className="overflow-hidden relative">
        <div className="grid grid-cols-4 gap-5">
          {categories.map((item, index) => {
            if (index >= 4) return null;
            return (
              <div className="pb-2" key={item.id}>
                <div className="category-slider-item-wrapper ">
                  <Image
                    src={item.icon}
                    alt="Product image"
                    className="w-full h-full object-cover"
                  />

                  <div className="category-slider-item-desc">
                    <FaPlusCircle className="w-10 h-10 mb-3" />
                    <p className="text-center">{item.desc}</p>
                  </div>
                </div>
                <Link href={item.href} className="font-bold block">
                  <p className="uppercase text-white bg-primary text-center p-2 ">
                    {item.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
