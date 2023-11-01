import { goiCo, products } from "@/data/products";
import React from "react";
import ProductItemVertical from "../Product/components/ProductItemVertical";

const RelatedProduct = () => {
  return (
    <div className="db-desc-wrapper text-white pb-20">
      <p className="text-3xl font-bold text-primary">Mô tả sản phẩm</p>

      <div className="grid grid-cols-4 gap-12">
        {goiCo.map((item) => {
          return <ProductItemVertical product={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProduct;
