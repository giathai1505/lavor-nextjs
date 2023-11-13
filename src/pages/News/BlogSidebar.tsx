import React from "react";
import FavoriteNews from "./BlogComponents/FavoriteNews";
import RecruitmentNews from "./BlogComponents/RecruitmentNews";
import BlogCategory from "./BlogComponents/BlogCategory";
import AboutLavor from "./BlogComponents/AboutLavor";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

const BlogSidebar = () => {
  return (
    <div className="text-white">
      <div className="flex items-center  border border-solid border-[#8080805e] mb-5 p-3 gap-2">
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none"
          placeholder="Tìm kiếm ..."
        />
        <BsSearch />
      </div>
      <AboutLavor />
      <FavoriteNews />
      <RecruitmentNews />
      <BlogCategory />
    </div>
  );
};

export default BlogSidebar;
