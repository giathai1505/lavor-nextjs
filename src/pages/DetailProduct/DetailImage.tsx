"use client";

import { products } from "@/data/products";
import { IProduct } from "@/types";
import React, { useState } from "react";

interface IDetailImage {
  product: IProduct;
}

const DetailImage: React.FC<IDetailImage> = ({ product }) => {
  const [activeImage, setActiveImage] = useState<string>(
    product.product_images[0]
  );
  return (
    <div className="grid grid-cols-5 gap-3 text-white">
      <div className="col-span-1">
        <div className="flex flex-col gap-3">
          {product.product_images.map((item) => {
            return (
              <img
                alt="Ảnh gối cổ"
                src={"http://" + item}
                className={`dp-slide-img-item ${
                  item === activeImage ? "active" : ""
                }`}
                onClick={() => setActiveImage(item)}
              />
            );
          })}
        </div>
      </div>
      <div className="col-span-4">
        <img src={"http://" + activeImage} alt="" className="dp-main-img" />
      </div>
    </div>
  );
};

export default DetailImage;
