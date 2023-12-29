"use client";
import NoneFormSelectCustom from "@/components/Common/NoneFormSelectCustom";
import React, { useEffect, useState } from "react";
import ProductItemVertical from "./components/ProductItemVertical";
import { IProduct, SlugToTitle } from "@/types/type";
import { useRouter } from "next/navigation";
import { Empty } from "antd";

const listDanhMuc = [
  {
    key: "tat-ca",
    value: "Tất cả sản phẩm",
  },
  {
    key: "boc-ghe-da",
    value: "Bọc ghế da",
  },
  {
    key: "goi-co",
    value: "Gối cổ",
  },
  {
    key: "goi-lung",
    value: "Gối lưng",
  },
  {
    key: "boc-tay-lai",
    value: "Bọc tay lái",
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
        <div className="flex justify-between flex-col gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <p className="font-bold text-xl text-primary uppercase">
              {SlugToTitle[slug as keyof typeof SlugToTitle]}
            </p>
            --------
            <p className="text-[15px]">
              Tổng cộng {Array.isArray(products) ? products?.length : 0} sản
              phẩm
            </p>
          </div>

          <NoneFormSelectCustom
            onChange={(a) => handleChangeCategory(a)}
            options={listDanhMuc}
            className="user"
            placeholder="Danh mục"
            value={selectedCategory}
          />
        </div>
        {Array.isArray(products) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 pt-10 pb-40">
            {products.map((item) => {
              return (
                <ProductItemVertical product={item} key={item.product_id} />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center my-20">
            <Empty
              description={
                <span className="text-white">Chưa có sản phẩm nào</span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
