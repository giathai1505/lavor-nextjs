"use client";
import { products } from "@/data/products";
import React, { useEffect, useRef, useState } from "react";
import LazyImage from "./Common/LazyImage";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
const num = 2;
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
          {products.map((item) => {
            return (
              <div
                style={{ width: `${productItemWidth}px` }}
                className="pb-2"
                key={item.id}
              >
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

export default CategorySlider;
