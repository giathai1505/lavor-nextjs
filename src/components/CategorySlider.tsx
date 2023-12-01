"use client";
import { categories, products } from "@/data/products";
import React, { useEffect, useRef, useState } from "react";
import LazyImage from "./Common/LazyImage";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
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

  const handleMoveSlider = (index: number) => {
    if (index === 1) {
      if (containerTransformLeft >= 0) return;
      setContainerTransformLeft((pre) => pre + productItemWidth + gap);
    } else {
      const invisibleItem = products.length - visibleItem;

      const maxWidth =
        invisibleItem * productItemWidth + (invisibleItem - 1) * gap;

      if (-(maxWidth - productItemWidth) === containerTransformLeft) return;
      setContainerTransformLeft((pre) => pre - productItemWidth - gap);
    }
  };

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
                <Link
                  href={item.href}
                  className="font-bold text-white bg-primary p-2 block"
                >
                  <p className="text-white uppercase font-bold text-center">
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
