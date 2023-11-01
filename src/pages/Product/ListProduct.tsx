"use client";
import NoneFormSelectCustom from "@/components/Common/NoneFormSelectCustom";
import React from "react";
import ProductListView from "./components/ProductListView";

interface IListProduct {
  categoryID: string;
}

const productFilterOptions = [
  {
    key: 0,
    value: "Lọc",
  },
  {
    key: 1,
    value: "Sản phẩm mới",
  },
  {
    key: 2,
    value: "Theo mức độ phổ biến",
  },

  {
    key: 3,
    value: "Giá: từ thấp tới cao",
  },

  {
    key: 4,
    value: "Giá từ cao tới thấp",
  },
];

const ListProduct: React.FC<IListProduct> = ({ categoryID }) => {
  return (
    <div className="bg-black py-14 text-white">
      <div className="wrapper">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold text-3xl text-primary">Gối cổ</p>
            <p className="text-xs">Tổng cộng 12 sản phẩm</p>
          </div>
          <div>
            <NoneFormSelectCustom
              onChange={(a) => console.log(a)}
              options={productFilterOptions}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 my-10">
          {Array.from(Array(10).keys()).map((item) => {
            return <ProductListView />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
