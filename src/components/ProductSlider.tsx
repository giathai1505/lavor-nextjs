"use client";
import React from "react";
import { Pagination, Navigation } from "swiper/modules";
import { IProduct } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import LazyImage from "./Common/LazyImage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import ProductItemVertical from "@/pages/Product/components/ProductItemVertical";

interface IProductSliderInterface {
  visibleItem: number;
  products: IProduct[];
}

const ProductSlider: React.FC<IProductSliderInterface> = ({
  products,
  visibleItem,
}) => {
  return (
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
         <ProductItemVertical product={item}/>  
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default ProductSlider;
