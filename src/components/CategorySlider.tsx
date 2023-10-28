"use client";

import { categories } from "@/data/products";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
let num = 4;
let gap = 20;

const CategorySlider = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [productItemWidth, setProductItemWidth] = useState<number>(0);
  const [containerTransformLeft, setContainerTransformLeft] =
    useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      let rect = containerRef.current.getBoundingClientRect();
      let childWidth = (rect.width - (num - 1) * gap) / num;
      setProductItemWidth(childWidth);
    }
  }, []);

  const handleMoveSlider = (index: number) => {
    if (index === 1) {
      if (containerTransformLeft >= 0) return;
      setContainerTransformLeft((pre) => pre + productItemWidth + gap);
    } else {
      const invisibleItem = categories.length - num;

      const maxWidth =
        invisibleItem * productItemWidth + (invisibleItem - 1) * gap;

      if (-(maxWidth - productItemWidth) === containerTransformLeft) return;
      setContainerTransformLeft((pre) => pre - productItemWidth - gap);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <AiFillLeftCircle
        className="slider-navigator -left-[25px]"
        onClick={() => handleMoveSlider(-1)}
      />

      <AiFillRightCircle
        className="slider-navigator -right-[25px]"
        onClick={() => handleMoveSlider(1)}
      />
      <div className="overflow-hidden relative">
        <div
          className="inline-flex gap-5 relative slide-wrapper"
          style={{ left: `${containerTransformLeft}px` }}
        >
          {categories.map((item) => {
            return (
              <Link
                href="/"
                style={{ width: `${productItemWidth}px` }}
                className="pb-2 relative"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt="Product image"
                  className="w-full rounded"
                />
                <p className="text-white uppercase font-medium absolute left-0 bottom-0 right-0 bg-primary text-center py-4">
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
