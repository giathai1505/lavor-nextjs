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
        <div className="px-10 hidden xl:block">
          <ProductSlider visibleItem={4} />
        </div>
        <div className="px-10 hidden md:block xl:hidden ">
          <ProductSlider visibleItem={2} />
        </div>
        <div className="px-10 md:hidden">
          <ProductSlider visibleItem={1} />
        </div>
        <h2 className="my-10">
          <span>Danh mục</span>
        </h2>

        <div className="px-10 hidden xl:block">
          <CategorySlider visibleItem={4} />
        </div>
        <div className="px-10 hidden md:block xl:hidden ">
          <CategorySlider visibleItem={2} />
        </div>
        <div className="px-10 md:hidden">
          <CategorySlider visibleItem={1} />
        </div>
      </div>
    </div>
  );
};

export default ProductPart;
