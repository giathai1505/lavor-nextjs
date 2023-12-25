"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";
import { IProduct } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import LazyImage from "./Common/LazyImage";

interface IProductSliderInterface {
  visibleItem: number;
  products: IProduct[];
}

const ProductSlider: React.FC<IProductSliderInterface> = ({
  products,
  visibleItem,
}) => {
  return (
    <>
      <Swiper
        slidesPerView={visibleItem}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {Array.isArray(products) &&
          products.map((item) => {
            return (
              <SwiperSlide key={item.product_id}>
                <div className="pb-2" key={item.product_id}>
                  <div className="rounded h-[215px] overflow-hidden">
                    <LazyImage
                      src={"http://" + item.product_images[0]}
                      alt="Product image"
                      className="w-full rounded h-[215px]"
                      placeHolderImage="data:image/png;base64,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"
                    />
                  </div>
                  <div className="mt-3 ml-3 font-bold">
                    <p className="text-white uppercase font-medium">
                      {item.product_name}
                    </p>
                    <p className="text-primary">
                      {formatCurrencyWithDots(item.product_price)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default ProductSlider;
