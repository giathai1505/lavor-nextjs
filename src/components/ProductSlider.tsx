"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import Image from "next/image";
import { IProduct } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
let gap = 20;

interface IProductSliderInterface {
  visibleItem: number;
  products: IProduct[];
}

const ProductSlider: React.FC<IProductSliderInterface> = ({
  visibleItem,
  products,
}) => {
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
          {Array.isArray(products) &&
            products.map((item) => {
              return (
                <div
                  style={{ width: `${productItemWidth}px` }}
                  className="pb-2"
                  key={item.product_id}
                >
                  <img
                    src={"http://" + item.product_images[0]}
                    alt="Product image"
                    className="w-full rounded"
                  />
                  <div className="mt-3 ml-3 font-bold">
                    <p className="text-white uppercase font-medium">
                      {item.product_name}
                    </p>
                    <p className="text-primary">
                      {formatCurrencyWithDots(item.product_price)}
                    </p>
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
