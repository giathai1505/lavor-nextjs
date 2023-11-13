import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import NewGridViewItem from "./NewItems/NewGridViewItem";
import { IBlog } from "@/types";

interface IRelatedNews {
  blogs: IBlog[];
}

const RelatedNews: React.FC<IRelatedNews> = ({ blogs }) => {
  return (
    <div className="text-white pb-40">
      <div className="flex justify-between items-center gap-20 mb-10">
        <p className="text-primary font-bold text-2xl">BÀI VIẾT LIÊN QUAN</p>

        <div className="flex-1 flex justify-end">
          <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
        </div>
        <Link
          href="/san-pham/goi-co"
          className="flex items-center gap-2 bg-white text-primary hover:bg-primary hover:text-white rounded-sm px-3 py-2 w-fit"
        >
          <span>Xem tất cả bài viết</span>
          <BsArrowRightShort />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-10">
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
