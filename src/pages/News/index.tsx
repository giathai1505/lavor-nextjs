"use client";
import PartHeader from "@/components/Common/PartHeader";
import React, { useEffect, useState } from "react";
import titleBackgroundImage from "@/assets/images/headerPart/6.jpeg";
import NewGridViewItem from "./NewItems/NewGridViewItem";
import { BiGridAlt } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import NewListViewItem from "./NewItems/NewListViewItem";
import BlogSidebar from "./BlogSidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category, IBlog, IPagination } from "@/types";
import Pagination from "@/components/Common/Pagination";
import { getAllBlogs } from "@/api/blog";

interface INews {
  blogs: IBlog[];
  pagination: IPagination;
}

export const renderCategory = (id: Category) => {
  let component = null;
  const className = "py-[6px] px-2 rounded-sm text-white w-fit text-xs";
  switch (id) {
    case Category.TIPS:
      component = (
        <div className={`${className} bg-[#ff3385]`}>Kiến thức & mẹo</div>
      );
      break;
    case Category.ABOUT:
      component = <div className={`${className} bg-[#0073ff]`}>Về Lavor</div>;
      break;
    case Category.RECRUITMENT:
      component = <div className={`${className} bg-[#ffae25]`}>Tuyền dụng</div>;
      break;

    default:
      component = (
        <div className={`${className} bg-[#ff3385]`}>Kiến thức & mẹo</div>
      );
      break;
  }
  return component;
};

const News: React.FC<INews> = ({ blogs, pagination }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<IBlog[]>([]);

  const typeView = searchParams?.get("view");
  const currentPage = searchParams?.get("page");

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

  useEffect(() => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? [])
    );

    if (!typeView) {
      current.set("view", "grid");
    }

    current.set("page", pagination.page);
    current.set("pageSize", pagination.limit);
    const url = current.toString();
    const query = url ? `?${url}` : "";
    router.replace(`${pathname}${query}`);

    setData(blogs);
  }, []);

  useEffect(() => {
    setData(blogs);
  }, [blogs]);

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? [])
    );
    current.set("page", page.toString());
    const url = current.toString();
    const query = url ? `?${url}` : "";
    router.push(`${pathname}${query}`);
  };

  const startIndex = (Number(pagination.page) - 1) * Number(pagination.limit);
  const endIndex = Math.min(
    startIndex + Number(pagination.limit) - 1,
    Number(pagination.total) - 1
  );

  return (
    <div>
      <PartHeader
        breadcrumb="Tin tức"
        title="Tin tức"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black pt-10">
        <div className="wrapper p-5 md:p-10 xl:p-0">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            <div className="col-span-1 xl:col-span-3">
              <div className="border border-solid mb-5 border-[#222121] py-2 px-5 flex items-center justify-between text-white">
                <p className="text-gray text-[15px]">
                  Hiển thị từ {startIndex + 1} - {endIndex + 1} /{" "}
                  {pagination.total} bài viết
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
                  {data.map((item) => {
                    return <NewGridViewItem blog={item} />;
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-10">
                  {data.map((item) => {
                    return <NewListViewItem blog={item} />;
                  })}
                </div>
              )}

              <div className="mt-5">
                <Pagination
                  currentPage={Number(currentPage)}
                  totalPages={Math.ceil(
                    pagination.total / Number(pagination.limit)
                  )}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            <div className="col-span-1">
              <BlogSidebar blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
