import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import NewGridViewItem from "./NewItems/NewGridViewItem";
import { IBlog } from "@/types/type";
import Each from "@/lib/Each";

interface IRelatedNews {
  blogs: IBlog[];
}

const RelatedNews: React.FC<IRelatedNews> = ({ blogs }) => {
  if (!Array.isArray(blogs)) return null;
  return (
    <div className="text-white p-5 md:p-10 xl:p-0">
      <div className="flex justify-between items-center md:gap-20 mb-10">
        <p className="text-primary font-bold text-2xl">BÀI VIẾT LIÊN QUAN</p>

        <div className="flex-1 justify-end hidden md:flex">
          <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
        </div>
        <Link
          href="/san-pham/goi-co"
          className="flex items-center gap-2 text-primary hover:text-white rounded-sm px-3 py-2 w-fit"
        >
          <span>Xem thêm</span>
          <BsArrowRightShort />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-10">
        <Each
          of={blogs}
          render={(item) => <NewGridViewItem blog={item} key={item.blog_id} />}
        />
      </div>
    </div>
  );
};

export default RelatedNews;
