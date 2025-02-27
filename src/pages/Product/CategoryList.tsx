import Each from "@/lib/Each";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { categories } from "@/assets/staticData";

const renderCategoryItem = (category: any, listValue: Map<string, number>) => {
  const numOfProduct =
    listValue && listValue.has(category.id) ? listValue.get(category.id) : 0;

  return (
    <Link href={category.href} className="category-wrapper">
      <div key={category.id} className="list-category-wrapper">
        <Image
          src={category.image}
          alt="Ảnh danh mục sản phẩm"
          placeholder="blur"
          className="object-cover rounded-full"
          loading="eager"
        />
      </div>
      <div className="flex categorys-center text-white flex-col gap-1">
        <p className=" font-bold">{category.name}</p>
        <span className="text-[12px]">{numOfProduct} sản phẩm</span>
      </div>
    </Link>
  );
};

interface ICategoryListProps {
  listValue: Map<string, number>;
}

const CategoryList: React.FC<ICategoryListProps> = ({ listValue }) => {
  const listCategories = [...categories].splice(0, 5);

  return (
    <div className="grid grid-cols-5 gap-5 my-14">
      <Each
        of={listCategories}
        render={(item) => renderCategoryItem(item, listValue)}
      />
    </div>
  );
};

export default CategoryList;
