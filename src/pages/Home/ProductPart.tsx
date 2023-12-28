import CategorySlider from "@/components/CategorySlider";
import ProductSlider from "@/components/ProductSlider";
import { IProduct } from "@/types/type";
import React from "react";

type TPageProps = {
  products: IProduct[];
};

const ProductPart: React.FC<TPageProps> = ({ products }) => {
  return (
    <div className=" bg-black ">
      <div className="wrapper py-10">
        <h2 className="mb-10">
          <span>Sản phẩm</span>
        </h2>
        <div className="px-10 hidden xl:block mb-20">
          <ProductSlider visibleItem={4} products={products} />
        </div>
        <div className="px-10 hidden md:block xl:hidden mb-20">
          <ProductSlider visibleItem={2} products={products} />
        </div>
        <div className="px-10 md:hidden mb-20">
          <ProductSlider visibleItem={1} products={products} />
        </div>
        <h2 className="my-10">
          <span>Danh mục</span>
        </h2>

        <div className="px-10 hidden xl:block mb-20">
          <CategorySlider />
        </div>
        <div className="px-10 hidden md:block xl:hidden mb-20">
          <CategorySlider />
        </div>
        <div className="px-10 md:hidden mb-20">
          <CategorySlider />
        </div>
      </div>
    </div>
  );
};

export default ProductPart;
