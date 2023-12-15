import React from "react";
import { AiOutlineArrowRight, AiOutlineCalendar } from "react-icons/ai";
import { Category, IBlog } from "@/types/type";
import moment from "moment";
import Link from "next/link";

interface IFavoriteNews {
  blogs: IBlog[];
}

const FavoriteNews: React.FC<IFavoriteNews> = ({ blogs }) => {
  return (
    <div className="bg-[#171818] p-5">
      <p className="font-bold text-lg mb-4 text-white">Tuyển dụng</p>
      <div>
        {Array.isArray(blogs) &&
          blogs
            .filter((item) => item.blog_category === Category.RECRUITMENT)
            .map((item) => {
              return (
                <div
                  className="text-white flex items-center gap-2 justify-between border-b border-solid border-[#222121] mt-5"
                  key={item.blog_id}
                >
                  <div>
                    <div className="flex items-center gap-2 text-[#a5a6aa] text-[13px]">
                      <AiOutlineCalendar />
                      <p>
                        {moment(item.blog_upload_date).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <Link
                      href={item.blog_url ?? ""}
                      className="text-base text-white my-3 ellipsis-text-2-lines hover:text-primary"
                    >
                      {item.blog_title}
                    </Link>
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
