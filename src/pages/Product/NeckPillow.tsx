import React from "react";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import ProductItemVertical from "./components/ProductItemVertical";
import { IProduct } from "@/types/type";
import Each from "@/lib/Each";

interface INeckPillowProps {
  listPillow: IProduct[];
}

const NeckPillow: React.FC<INeckPillowProps> = ({ listPillow }) => {
  if (!Array.isArray(listPillow)) return null;
  return (
    <div className="p-5 md:p-10 xl:px-0 xl:py-10">
      <div className="mb-10">
        <div className="flex justify-between items-center gap-20">
          <p className="text-primary font-bold text-xl xl:text-3xl">GỐI CỔ</p>

          <div className="flex-1 flex justify-end">
            <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
          </div>
          <Link
            href="/san-pham/goi-co"
            className="flex items-center gap-2  text-primary hover:bg-primary hover:text-white rounded-sm px-3 py-2 w-fit"
          >
            <span>Xem thêm</span>
            <BsArrowRightShort />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 px-10 md:p-0 gap-12">
        <Each
          of={listPillow.slice(0, 4)}
          render={(props) => (
            <ProductItemVertical product={props} key={props.product_id} />
          )}
        />
      </div>
    </div>
  );
};

export default NeckPillow;
