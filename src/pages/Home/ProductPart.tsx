import CategorySlider from "@/components/CategorySlider";
import ProductSlider from "@/components/ProductSlider";
import React from "react";

const ProductPart = () => {
  return (
    <div className=" bg-black ">
      <div className="wrapper py-10">
        <h2 className="mb-10">
          <span>Sản phẩm</span>
        </h2>
        <div className="">
          <ProductSlider />
        </div>
        <h2 className="my-10">
          <span>Danh mục</span>
        </h2>
        <div>
          <CategorySlider />
        </div>
      </div>
    </div>
  );
};

export default ProductPart;
