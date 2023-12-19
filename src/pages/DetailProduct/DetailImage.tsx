"use client";
import React from "react";
import { TImageItem } from ".";

interface IDetailImage {
  productImages: TImageItem[];
  activeVariant: TImageItem;
onChangeVariant: (data: TImageItem) => void
}

const DetailImage: React.FC<IDetailImage> = ({ productImages, activeVariant, onChangeVariant }) => {
  if (!productImages) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-white">
      <div className="col-span-1">
        <div className="flex flex-col gap-3">
          {productImages.map((item) => {
            return (
              <img
                alt="Ảnh gối cổ"
                src={"http://" + item.url}
                className={`dp-slide-img-item ${
                  item.id === activeVariant.id ? "active" : ""
                }`}
                onClick={() => onChangeVariant(item)}
              />
            );
          })}
        </div>
      </div>
      <div className="col-span-4">
        <img
          src={"http://" + activeVariant.url}
          alt="Hình ảnh sản phẩm"
          className="dp-main-img h-[200px] md:h-[350px]"
        />
      </div>
    </div>
  );
};

export default DetailImage;
