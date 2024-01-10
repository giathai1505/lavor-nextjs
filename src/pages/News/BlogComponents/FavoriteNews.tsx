import React from "react";
import { AiOutlineArrowRight, AiOutlineCalendar } from "react-icons/ai";
import { Category, IBlog } from "@/types/type";
import moment from "moment";
import Link from "next/link";
import Each from "@/lib/Each";

const renderFavoriteNewsItem = (blog: IBlog) => {
  return (
    <div
      className="text-white flex items-center gap-2 justify-between border-b border-solid border-[#222121] mt-5"
      key={blog.blog_id}
    >
      <div>
        <div className="flex items-center gap-2 text-[#a5a6aa] text-[13px]">
          <AiOutlineCalendar />
          <p>{moment(blog.blog_upload_date).format("DD/MM/YYYY")}</p>
        </div>
        <Link
          href={blog.blog_url ?? ""}
          className="text-base text-white my-3 ellipsis-text-2-lines hover:text-primary"
        >
          {blog.blog_title}
        </Link>
      </div>
      <AiOutlineArrowRight />
    </div>
  );
};

interface IFavoriteNews {
  blogs: IBlog[];
}

const FavoriteNews: React.FC<IFavoriteNews> = ({ blogs }) => {
  const favoritesNews = Array.isArray(blogs) ? blogs.filter(
    (item) => item.blog_category === Category.RECRUITMENT
  ) : []
  return (
    <div className="bg-[#171818] p-5">
      <p className="font-bold text-lg mb-4 text-white">Tuyển dụng</p>
      <div>
        <Each
          of={favoritesNews}
          render={(item) => renderFavoriteNewsItem(item)}
        />
      </div>
    </div>
  );
};

export default FavoriteNews;
