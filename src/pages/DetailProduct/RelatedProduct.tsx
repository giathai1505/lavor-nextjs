import React from "react";
import ProductItemVertical from "../Product/components/ProductItemVertical";
import { IProduct } from "@/types/type";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import Each from "@/lib/Each";

interface IRelatedProducts {
  products: IProduct[];
}

const RelatedProduct: React.FC<IRelatedProducts> = ({ products }) => {
  if (!Array.isArray(products)) return null;
  return (
    <div className="text-white mt-10">
      <div className="flex justify-between items-center gap-5 md:gap-20 mb-10">
        <p className="text-primary font-bold text-xl md:text-2xl">
          SẢN PHẨM LIÊN QUAN
        </p>

        <div className="flex-1 justify-end hidden md:flex">
          <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
        </div>
        <Link
          href="/san-pham/goi-co"
          className="flex items-center gap-2 text-primary hover:bg-primary hover:text-white rounded-sm px-3 py-2 w-fit"
        >
          <span>Xem tất cả</span>
          <BsArrowRightShort />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-10">
        <Each
          of={products.slice(0, 4)}
          render={(product) => (
            <ProductItemVertical product={product} key={product.product_id} />
          )}
        />
      </div>
    </div>
  );
};

export default RelatedProduct;
