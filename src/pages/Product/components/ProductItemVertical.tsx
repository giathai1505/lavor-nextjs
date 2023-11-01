import Link from "next/link";
import React from "react";
import { IProduct } from "./ProductItemHorizontal";
import Image from "next/image";

const color = ["#E6C197", "#F58220", "##000000"];

interface IProductVertical {
  product: IProduct;
}

const ProductItemVertical: React.FC<IProductVertical> = ({ product }) => {
  return (
    <Link
      href="/goi-co-premium"
      className="product-wrapper border border-solid border-primary"
      key={product.id}
    >
      <div className="w-full h-[200px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          alt="Hình ảnh sản phẩm"
          src={product.image}
          placeholder="blur"
        />
      </div>

      <div className="text-white p-4 flex flex-col gap-2">
        <span className="text-white border text-xs border-solid border-primary px-2 py-1 bg-primary w-fit rounded-lg">
          {product.category}
        </span>
        <p className="font-bold text-base">{product.name}</p>
        <div className="flex gap-2 items-center">
          <span className="text-2xl font-bold text-primary">
            {product.price}
          </span>
          <span className="text-xs">VNĐ</span>
        </div>
        <p className="text-md">Màu sắc:</p>
        <div className="flex gap-2">
          {color.map((color) => {
            return (
              <div
                key={color}
                style={{ background: color }}
                className={`w-4 h-4 rounded-full border border-solid border-gray cursor-pointer`}
              ></div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default ProductItemVertical;
