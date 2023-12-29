import Link from "next/link";
import React from "react";
import Image from "next/image";
import { IProduct, ProductTypeToText } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";

const color = ["#E6C197", "#F58220", "##000000"];

interface IProductVertical {
  product: IProduct;
}

const ProductItemVertical: React.FC<IProductVertical> = ({ product }) => {
  if (!product) return null;
  return (
    <Link
    href={"/chi-tiet-san-pham/" + product.product_id}
      className="product-wrapper w-[300px] mx-auto border border-solid border-[#443e3e] hover:border-primary"
      key={product.product_id}
    >
      <div className="w-full h-[200px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt="Hình ảnh sản phẩm"
          src={"http://" + product.product_images[0]}
          placeholder="blur"
        />
      </div>

      <div className="text-white p-4 flex flex-col gap-3">
        <span className="text-white border text-xs border-solid border-primary px-2 py-1 bg-primary w-fit rounded-lg">
          {ProductTypeToText[product.product_type]}
        </span>
        <p className="font-bold text-lg hover:text-primary">
          {product.product_name}
        </p>

        {product.variants.length > 1 && (
          <div className="flex gap-2">
            {product.variants.map((variant) => {
              return (
                <div
                  key={variant.variant_color}
                  style={{ background: variant.variant_color }}
                  className={`w-4 h-4 rounded-full border border-solid border-gray cursor-pointer`}
                ></div>
              );
            })}
          </div>
        )}

        {product.product_price !== 0 && (
          <div className="flex items-center text-primary">
            <span className="font-bold ">
              {formatCurrencyWithDots(product.product_price)}
            </span>
            <span className="text-xs">đ</span>
          </div>
        )}

        {/* <p className="text-md">Màu sắc:</p> */}
      </div>
    </Link>
  );
};

export default ProductItemVertical;
