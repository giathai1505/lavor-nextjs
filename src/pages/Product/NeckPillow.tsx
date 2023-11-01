import React from "react";
import { goiCo } from "@/data/products";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import ProductItemVertical from "./components/ProductItemVertical";

const NeckPillow = () => {
  return (
    <div className="py-10">
      <div className="mb-10">
        <div className="flex justify-between items-center gap-20">
          <p className="text-primary font-bold text-3xl">GỐI CỔ</p>

          <div className="flex-1 flex justify-end">
            <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
          </div>
          <Link
            href="/san-pham/goi-co"
            className="flex items-center gap-2 bg-white text-primary hover:bg-primary hover:text-white rounded-sm px-3 py-2 w-fit"
          >
            <span>Xem tất cả</span>
            <BsArrowRightShort />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-12">
        {goiCo.map((item) => {
          return <ProductItemVertical product={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default NeckPillow;
