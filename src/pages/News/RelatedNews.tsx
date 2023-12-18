import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import NewGridViewItem from "./NewItems/NewGridViewItem";
import { IBlog } from "@/types/type";

interface IRelatedNews {
  blogs: IBlog[];
}

const RelatedNews: React.FC<IRelatedNews> = ({ blogs }) => {
  return (
    <div className="text-white p-5">
      <div className="flex justify-between items-center md:gap-20 mb-10">
        <p className="text-primary font-bold text-2xl">BÀI VIẾT LIÊN QUAN</p>

        <div className="flex-1 justify-end hidden md:flex">
          <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
        </div>
        <Link
          href="/san-pham/goi-co"
          className="flex items-center gap-2 bg-white text-primary hover:bg-primary hover:text-white rounded-sm px-3 py-2 w-fit"
        >
          <span>Xem thêm</span>
          <BsArrowRightShort />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-10">
        {Array.isArray(blogs) &&
          blogs.length > 0 &&
          blogs.map((item) => {
            return <NewGridViewItem blog={item} />;
          })}
      </div>
    </div>
  );
};

export default RelatedNews;
