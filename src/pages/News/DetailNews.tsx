import PartHeader from "@/components/Common/PartHeader";
import Link from "next/link";
import React from "react";
import { FiFacebook, FiMail, FiYoutube } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";
import { renderCategory } from "./Newest";
import { AiOutlineCalendar } from "react-icons/ai";
import titleBackgroundImage from "@/assets/images/headerPart/6.jpeg";
import { IBlog } from "@/types";
import BlogSidebar from "./BlogSidebar";
import moment from "moment";
import parse from "html-react-parser";
import RelatedNews from "./RelatedNews";
interface IPageProps {
  blog: IBlog;
  relatedBlogs: IBlog[];
}

const DetailNews: React.FC<IPageProps> = ({ blog, relatedBlogs }) => {
  return (
    <div>
      <PartHeader
        breadcrumb="Tin tức"
        title="Tin tức"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black py-20">
        <div className="grid grid-cols-4 gap-10 wrapper">
          <div className="col-span-3 flex flex-col gap-5">
            {renderCategory(blog.blog_category)}
            <p className="text-2xl text-white">{blog.blog_title}</p>
            <div className="flex items-center gap-5">
              <span className="text-[#a5a6aa]">
                By <span className="text-white">ADMIN</span>
              </span>

              <div className="flex items-center gap-2 text-[#a5a6aa]">
                <AiOutlineCalendar />
                <p>{moment(blog.blog_upload_date).format("DD/MM/YYYY")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="media-icon bg-[#1559c2] ">
                <FiFacebook className="" />
              </Link>
              <Link href="/" className="media-icon bg-[#f65e97] ">
                <PiTiktokLogo />
              </Link>
              <Link href="/" className="media-icon bg-[#43ce13] ">
                <FiMail />
              </Link>
              <Link href="/" className="media-icon bg-[#ff6b10] ">
                <FiYoutube />
              </Link>
            </div>
            <p className="text-white">{blog.blog_description}</p>
            <div className="h-[500px]">
              <img
                src={"http://" + blog.blog_image_url}
                alt="Quảng cáo xe hơi"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="blog-content">{parse(blog.blog_content)}</p>
          </div>
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="wrapper">
          <RelatedNews blogs={relatedBlogs} />
        </div>
      </div>
    </div>
  );
};

export default DetailNews;
