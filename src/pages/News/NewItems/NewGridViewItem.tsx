import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { renderCategory } from "../Newest";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";
import { newestNews } from "@/data/news";
import { Category, IBlog } from "@/types";
import moment from "moment";

interface INewBlogItem {
  blog: IBlog;
}

const NewGridViewItem: React.FC<INewBlogItem> = ({ blog }) => {
  return (
    <div className="blog-item-wrapper border border-solid border-[#8080805e] text-white mb-5">
      <div className="h-[300px] overflow-hidden">
        <img
          src={"http://" + blog.blog_image_url}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex item-center gap-5">
          {renderCategory(blog.blog_category)}
          <div className="flex items-center text-[13px] gap-2 text-[#a5a6aa]">
            <AiOutlineCalendar />
            <p>{moment(blog.blog_upload_date).format("DD/MM/YYYY")}</p>
          </div>
        </div>

        <Link
          href={"/tin-tuc/" + blog.blog_url ?? ""}
          className="text-[22px] text-white cursor-pointer hover:text-primary"
        >
          {blog.blog_title}
        </Link>
        <p className="text-[#a5a6aa] ellipsis-text-3-lines">
          {blog.blog_description}
        </p>

        <Link
          href={"/tin-tuc/" + blog.blog_url ?? ""}
          className="flex items-center gap-2 border border-solid border-gray text-primary hover:bg-primary hover:text-white hover:border-0 rounded-sm px-2 py-1 text-xs w-fit"
        >
          <span>Xem bài viết</span>
          <BsArrowRightShort />
        </Link>
      </div>
    </div>
  );
};

export default NewGridViewItem;
