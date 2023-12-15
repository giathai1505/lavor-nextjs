import { categories } from "@/assets/staticData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ICategoryListProps {
  listValue: Map<string, number>;
}

const CategoryList: React.FC<ICategoryListProps> = ({ listValue }) => {
  if (!listValue) return null;
  return (
    <div className="grid grid-cols-5 gap-5 my-14">
      {categories.map((item) => {
        return (
          <Link href={item.href} className="category-wrapper">
            <div key={item.id} className="list-category-wrapper">
              <Image src={item.image} alt="Ảnh danh mục sản phẩm" />
            </div>
            <div className="flex items-center text-white flex-col gap-1">
              <p className=" font-bold">{item.name}</p>
              <span className="text-[12px]">
                {listValue.has(item.id) ? listValue.get(item.id) : 0} sản phẩm
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryList;
