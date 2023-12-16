"use client";
import PartHeader from "@/components/Common/PartHeader";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiFacebook, FiMail, FiYoutube } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";
import { AiOutlineCalendar } from "react-icons/ai";
import titleBackgroundImage from "@/assets/images/headerPart/6.jpeg";
import { IBlog } from "@/types/type";
import BlogSidebar from "./BlogSidebar";
import moment from "moment";
import parse from "html-react-parser";
import RelatedNews from "./RelatedNews";
import { renderCategory } from ".";

interface IPageProps {
  blog: IBlog;
  relatedBlogs: IBlog[];
  allBlogs: IBlog[];
}

const getNestedHeadings = (headingElements: any) => {
  const nestedHeadings: any = [];

  headingElements.forEach((heading: any, index: any) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const DetailNews: React.FC<IPageProps> = ({ blog, relatedBlogs, allBlogs }) => {
  if (!blog) return null;
  const [nestedHeadings, setNestedHeadings] = useState<any>([]);
  const blogContentRef = useRef<null | HTMLDivElement>(null);
  const [activeHeading, setActiveHeading] = useState("");

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

  useEffect(() => {
    const handleScroll = () => {
      if (blogContentRef && blogContentRef.current) {
        const headingElements = Array.from(
          blogContentRef.current.querySelectorAll("h2, h3")
        );

        let currentActiveHeading = "";
        for (const heading of headingElements) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom > 0) {
            currentActiveHeading = heading.id;
            break;
          }
        }

        setActiveHeading(currentActiveHeading);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [blogContentRef]);

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

  return (
    <div>
      <PartHeader
        breadcrumb="Tin tức"
        title="Tin tức"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black p-5 md:p-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 wrapper">
          <div className="col-span-1 xl:col-span-2 flex flex-col gap-5">
            <p className="text-2xl text-white">{blog.blog_title}</p>
            <div className="flex items-center gap-5">
              <span className="text-[#a5a6aa]">
                By <span className="text-white">ADMIN</span>
              </span>
              {renderCategory(blog.blog_category)}
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
            <div className="h-[150px] md:h-[400px] xl:h-[500px]">
              <img
                src={"http://" + blog.blog_image_url}
                alt="Quảng cáo xe hơi"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="blog-content" ref={blogContentRef}>
              {parse(blog.blog_content)}
            </div>
          </div>
          <div>
            <p className="font-bold text-lg  text-white mb-4">
              Nội dung bài viết
            </p>
            <div className="table-of-content">
              <ul>
                {nestedHeadings.map((heading: any, index: number) => (
                  <li key={heading?.id}>
                    <a
                      href={`#${heading?.id}`}
                      onClick={(e) => handleClickTableOfView(e, index + 1)}
                    >
                      {heading?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <BlogSidebar blogs={allBlogs} />
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
