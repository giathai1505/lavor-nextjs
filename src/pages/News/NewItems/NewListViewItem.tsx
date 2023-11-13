import { IBlog } from "@/types";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { renderCategory } from "../Newest";
import { newestNews } from "@/data/news";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import moment from "moment";

interface INewBlogItem {
  blog: IBlog;
}

const NewListViewItem: React.FC<INewBlogItem> = ({ blog }) => {
  return (
    <div className="blog-item-wrapper grid grid-cols-3 border gap-5 border-solid border-[#8080805e]">
      <div className="h-full min-h-[300px] min-w-[300px] overflow-hidden col-span-1">
        <img
          src={"http://" + blog.blog_image_url}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-2 flex flex-col gap-3 mx-5 my-auto col-span-2">
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
        <p className="text-[#a5a6aa]  ellipsis-text-3-lines">
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

export default NewListViewItem;
