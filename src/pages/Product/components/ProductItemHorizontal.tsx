import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

export interface IProduct {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
  category: string;
}

interface IProductItemHorizontal {
  product: IProduct;
}

const ProductItemHorizontal: React.FC<IProductItemHorizontal> = ({
  product,
}) => {
  return (
    <Link
      href=""
      className="product-wrapper text-white grid grid-cols-2 gap-5 mb-10"
    >
      <div className="w-full h-[150px] overflow-hidden">
        <Image
          alt=""
          src={product.image}
          className="w-full h-full rounded-sm object-cover"
        ></Image>
      </div>
      <div className="py-auto flex items-center">
        <div className="flex flex-col gap-2">
          <span className="text-white border text-xs border-solid border-primary px-2 py-[2px] bg-primary w-fit rounded-full">
            {product.category}
          </span>
          <p className="font-bold text-md">{product.name}</p>
          <p className="flex gap-1 items-center">
            <span className="font-bold text-primary">{product.price}</span>
            <span className="text-[10px]">VNĐ</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItemHorizontal;
