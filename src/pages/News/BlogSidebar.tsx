import React from "react";
import FavoriteNews from "./BlogComponents/FavoriteNews";
import Followers from "./BlogComponents/Followers";
import BlogCategory from "./BlogComponents/BlogCategory";
import AboutLavor from "./BlogComponents/AboutLavor";
import { IBlog } from "@/types/type";

interface IBlogSidebarProps {
  blogs: IBlog[];
}

const BlogSidebar: React.FC<IBlogSidebarProps> = ({ blogs }) => {
  return (
    <div className="text-white">
      <AboutLavor />
      <FavoriteNews blogs={blogs} />
      <Followers />
      <BlogCategory blogs={blogs} />
    </div>
  );
};

export default BlogSidebar;
