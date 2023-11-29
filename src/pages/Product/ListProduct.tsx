"use client";
import NoneFormSelectCustom from "@/components/Common/NoneFormSelectCustom";
import React, { useEffect, useState } from "react";
import ProductItemVertical from "./components/ProductItemVertical";
import { IProduct, SlugToTitle } from "@/types";
import { useRouter } from "next/navigation";

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

const listDanhMuc = [
  {
    key: 0,
    value: "Tất cả sản phẩm",
  },
  {
    key: "boc-ghe",
    value: "Bọc ghé",
  },
  {
    key: "boc-tay-lai",
    value: "Bọc tay lái",
  },

  {
    key: "goi-co",
    value: "Gối cổ",
  },

  {
    key: "tham-lot-san",
    value: "Thảm lót sàn",
  },
  {
    key: "san-pham-khac",
    value: "Sản phẩm khác",
  },
];

interface IListProduct {
  categoryID: string;
  products: IProduct[];
  slug: string;
}
const ListProduct: React.FC<IListProduct> = ({
  categoryID,
  products,
  slug,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    setSelectedCategory(slug);
  }, [slug]);

  const handleChangeCategory = (a: any) => {
    setSelectedCategory(a.key);
    router.push("/san-pham/" + a.key);
  };
  return (
    <div className="bg-black p-10 xl:px-0 xl:py-16 text-white">
      <div className="wrapper">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold text-xl text-primary uppercase">
              {SlugToTitle[slug as keyof typeof SlugToTitle]}
            </p>
            --------
            <p className="text-[15px]">
              Tổng cộng {Array.isArray(products) && products?.length} sản phẩm
            </p>
          </div>
          <div className="items-center gap-10 hidden xl:flex">
            <NoneFormSelectCustom
              onChange={(a) => handleChangeCategory(a)}
              options={listDanhMuc}
              className="user"
              placeholder="Danh mục"
              value={selectedCategory}
            />
            <NoneFormSelectCustom
              onChange={(a) => console.log(a)}
              options={productFilterOptions}
              className="user"
              placeholder="Lọc"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 pt-10 pb-40">
          {Array.isArray(products) &&
            products.map((item) => {
              return (
                <ProductItemVertical product={item} key={item.product_id} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
