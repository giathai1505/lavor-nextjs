"use client";

import { products } from "@/data/products";
import React, { useEffect, useRef, useState } from "react";
import LazyImage from "./Common/LazyImage";
import logo from "@/assets/images/logo/logo-white.png";
let num = 5;
let gap = 20;

const ProductSlider = () => {
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
      const invisibleItem = products.length - num;

      const maxWidth =
        invisibleItem * productItemWidth + (invisibleItem - 1) * gap;

      if (-(maxWidth - productItemWidth) === containerTransformLeft) return;
      setContainerTransformLeft((pre) => pre - productItemWidth - gap);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className="slider-navigator -left-[25px]"
        onClick={() => handleMoveSlider(-1)}
      >
        &lt;
      </div>
      <div
        className="slider-navigator -right-[25px]"
        onClick={() => handleMoveSlider(1)}
      >
        &gt;
      </div>
      <div className="overflow-hidden relative">
        <div
          className="inline-flex gap-5 relative slide-wrapper"
          style={{ left: `${containerTransformLeft}px` }}
        >
          {products.map((item) => {
            return (
              <div style={{ width: `${productItemWidth}px` }} className="pb-2">
                <LazyImage
                  src={item.image}
                  alt="Product image"
                  className="w-full rounded"
                  placeHolderImage="https://static.thenounproject.com/png/741653-200.png"
                />
                <div className="mt-2 font-bold">
                  <p className="text-white uppercase font-medium">
                    {item.name}
                  </p>
                  <p className="text-primary">{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
