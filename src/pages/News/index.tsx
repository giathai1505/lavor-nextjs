"use client";
import PartHeader from "@/components/Common/PartHeader";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/6.jpeg";
import NewGridViewItem from "./NewItems/NewGridViewItem";
import { BiGridAlt } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import NewListViewItem from "./NewItems/NewListViewItem";
import BlogSidebar from "./BlogSidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IBlog } from "@/types";

interface INews {
  blogs: IBlog[];
}

const News: React.FC<INews> = ({ blogs }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeView = searchParams?.get("view");

  const handleChangeViewOption = (view: string) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? [])
    );

    if (!view) {
      current.delete("view");
    } else {
      current.set("view", view);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="">
      <PartHeader
        breadcrumb="Tin tức"
        title="Tin tức"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black">
        <div className="wrapper  p-5 md:p-10 xl:p-0">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            <div className="col-span-1 xl:col-span-3">
              <div className="border border-solid mb-5 border-[#222121] py-2 px-5 flex items-center justify-between text-white">
                <p className="text-gray text-[13px]">
                  Hiển thị từ 1-6 / 8 bài viết
                </p>
                <div className="flex items-center gap-2">
                  <BiGridAlt
                    className={`view-type-icon ${
                      typeView === "grid" ? "active" : ""
                    }`}
                    onClick={() => handleChangeViewOption("grid")}
                  />
                  |
                  <BsList
                    className={`view-type-icon ${
                      typeView === "list" ? "active" : ""
                    }`}
                    onClick={() => handleChangeViewOption("list")}
                  />
                </div>
              </div>

              {typeView === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {blogs.map((item) => {
                    return <NewGridViewItem blog={item} />;
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-10">
                  {blogs.map((item) => {
                    return <NewListViewItem blog={item} />;
                  })}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
