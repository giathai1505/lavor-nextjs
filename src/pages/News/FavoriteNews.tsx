import React from "react";
import NewsTitle from "./NewsTitle";
import { AiOutlineArrowRight, AiOutlineCalendar } from "react-icons/ai";
import { newestNews } from "@/data/news";

const FavoriteNews = () => {
  return (
    <div className="bg-[#171818] p-5">
      <NewsTitle text="Tuyển dụng" />
      <div>
        {newestNews.map((item) => {
          return (
            <div
              className="text-white flex items-center gap-2 justify-between border-b border-solid border-[#222121] mt-5"
              key={item.id}
            >
              <div>
                <div className="flex items-center gap-2 text-[#a5a6aa]">
                  <AiOutlineCalendar />
                  <p>{item.dated}</p>
                </div>
                <p className="text-base text-white my-3">{item.title}</p>
              </div>
              <AiOutlineArrowRight />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteNews;
