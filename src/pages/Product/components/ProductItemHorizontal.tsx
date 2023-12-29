import { IProduct, ProductTypeToText } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import Link from "next/link";
import React from "react";

interface IProductItemHorizontal {
  product: IProduct;
}

const ProductItemHorizontal: React.FC<IProductItemHorizontal> = ({
  product,
}) => {
  if (!product) return null;
  return (
    <Link
      href={"/chi-tiet-san-pham/" + product.product_id}
      className="product-wrapper text-white grid grid-cols-2 gap-5 mb-10"
    >
      <div className="w-full h-[150px] overflow-hidden">
        <img
          src={"http://" + product.product_images[0]}
          alt="Hình ảnh sản phẩm"
          className="w-full h-full rounded-sm object-cover"
        ></img>
      </div>
      <div className="py-auto flex items-center">
        <div className="flex flex-col gap-2">
          <span className="text-white border text-xs border-solid border-primary px-2 py-[2px] bg-primary w-fit rounded-full">
            {ProductTypeToText[product.product_type]}
          </span>
          <p className="font-bold text-md">{product.product_name}</p>
          {product.product_price !== 0 && (
            <p className="flex gap-1 items-center">
              <span className="font-bold text-primary">
                {formatCurrencyWithDots(product.product_price)}
              </span>
              <span className="text-[10px]">VNĐ</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItemHorizontal;
