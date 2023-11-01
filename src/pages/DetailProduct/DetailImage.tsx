"use client";

import React, { useState } from "react";

interface IDetailImage {
  productImgs: string[];
}

const DetailImage: React.FC<IDetailImage> = ({ productImgs }) => {
  const [activeImage, setActiveImage] = useState<string>(productImgs[0]);
  return (
    <div className="grid grid-cols-5 gap-3 text-white">
      <div className="col-span-1">
        <div className="flex flex-col gap-3">
          {productImgs.map((item) => {
            return (
              <img
                alt="Ảnh gối cổ"
                src={item}
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
        <img src={activeImage} alt="" className="dp-main-img" />
      </div>
    </div>
  );
};

export default DetailImage;
