"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiFacebook, FiMail, FiYoutube } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";
import { SocialMediaLink } from "@/assets/staticData";
import parse from "html-react-parser";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai";
import { IBlog } from "@/types/type";
import { getNestedHeadings } from "@/utilities/commonUtilities";
import CategoryOfBlog from "./CategoryOfBlog";

const SocialMediaGroup = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={SocialMediaLink.facebook}
        className="media-icon bg-[#1559c2] "
      >
        <FiFacebook className="" />
      </Link>
      <Link href={SocialMediaLink.tiktok} className="media-icon bg-[#f65e97] ">
        <PiTiktokLogo />
      </Link>
      <Link href="/" className="media-icon bg-[#43ce13] ">
        <FiMail />
      </Link>
      <Link href={SocialMediaLink.youtube} className="media-icon bg-[#ff6b10] ">
        <FiYoutube />
      </Link>
    </div>
  );
};

type TTableOfContentProps = {
  nestedHeadings: any;
  onChange: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: number
  ) => void;
};
const TableOfContent = ({ nestedHeadings, onChange }: TTableOfContentProps) => {
  if (!(Array.isArray(nestedHeadings) && nestedHeadings.length > 0))
    return null;

  return (
    <div className="w-[400px]">
      <p className="font-bold text-lg  text-white mb-4">Nội dung bài viết</p>
      <div className="table-of-content">
        <ul>
          {nestedHeadings.map((heading: any, index: number) => (
            <li key={heading?.id}>
              <a
                href={`#${heading?.id}`}
                onClick={(e) => onChange(e, index + 1)}
              >
                {heading?.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DetailBlog = ({ blog }: { blog: IBlog }) => {
  const [nestedHeadings, setNestedHeadings] = useState<any>([]);
  const blogContentRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (blogContentRef && blogContentRef.current) {
      const headingElements = Array.from(
        blogContentRef.current.querySelectorAll("h2, h3")
      );

      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
      headingElements.forEach((heading, index) => {
        const id = `heading-${index + 1}`;
        heading.setAttribute("id", id);
      });
    }
  }, []);

  const handleClickTableOfView = (e: any, index: number) => {
    e.preventDefault();
    if (blogContentRef.current) {
      const headingElement = blogContentRef.current.querySelector(
        `#heading-${index}`
      );
      if (headingElement) {
        headingElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  if (!blog) return null;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-2xl text-white">{blog.blog_title}</p>
      <div className="flex items-center gap-5">
        <span className="text-[#a5a6aa]">
          By <span className="text-white">ADMIN</span>
        </span>

        <CategoryOfBlog CategoryId={blog.blog_category} />

        <div className="flex items-center gap-2 text-[#a5a6aa]">
          <AiOutlineCalendar />
          <p>{moment(blog.blog_upload_date).format("DD/MM/YYYY")}</p>
        </div>
      </div>

      <SocialMediaGroup />

      <TableOfContent
        nestedHeadings={nestedHeadings}
        onChange={handleClickTableOfView}
      />

      <p className="text-white">{blog.blog_description}</p>

      <div className="h-[150px] md:h-[400px] xl:h-[500px]">
        <img
          src={blog.blog_image_url}
          alt="Quảng cáo xe hơi"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="blog-content" ref={blogContentRef}>
        {parse(blog.blog_content)}
      </div>
    </div>
  );
};

export default DetailBlog;
