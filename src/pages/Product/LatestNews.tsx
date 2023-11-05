import { newestNews } from "@/data/news";
import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { renderCategory } from "../News/Newest";
import { AiOutlineCalendar } from "react-icons/ai";
import { Category } from "@/types";

const LatestNews = () => {
  return (
    <div className="text-white pb-40">
      <div className="flex justify-between items-center gap-20 mb-10">
        <p className="text-primary font-bold text-3xl">BÀI VIẾT MỚI NHẤT</p>

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
        {[1, 2, 3].map((item) => {
          return (
            <div className="border border-solid border-[#222121]">
              <div className="h-[300px]">
                <img
                  src={newestNews[0].image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-10 my-5">
                {renderCategory(Category.ABOUT)}
                <p className="text-[22px] text-white my-5">
                  {newestNews[0].title}
                </p>
                <div className="flex items-center gap-2 mb-5 text-[#a5a6aa]">
                  <AiOutlineCalendar />
                  <p>{newestNews[0].dated}</p>
                </div>
                <Link
                  href="/san-pham/goi-co"
                  className="flex items-center gap-2 border border-solid border-gray text-primary hover:bg-primary hover:text-white rounded-sm px-2 py-1 text-xs w-fit"
                >
                  <span>Xem bài viết</span>
                  <BsArrowRightShort />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestNews;
