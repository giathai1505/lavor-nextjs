"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { categories } from "@/assets/staticData";
const gap = 20;
interface IProductSliderInterface {
  visibleItem: number;
}

const CategorySlider: React.FC<IProductSliderInterface> = ({ visibleItem }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [productItemWidth, setProductItemWidth] = useState<number>(0);
  const [containerTransformLeft, setContainerTransformLeft] =
    useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      let rect = containerRef.current.getBoundingClientRect();
      let childWidth = (rect.width - (visibleItem - 1) * gap) / visibleItem;
      setProductItemWidth(childWidth);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="overflow-hidden relative">
        <div
          className="flex gap-5 relative rounded overflow-hidden cursor-pointer"
          style={{ left: `${containerTransformLeft}px` }}
        >
          {categories.map((item, index) => {
            if (index >= 4) return null;
            return (
              <div
                style={{ width: `${productItemWidth}px` }}
                className="pb-2"
                key={item.id}
              >
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
