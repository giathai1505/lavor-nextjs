"use client";
import PartHeader from "@/components/Common/PartHeader";
import React, { Suspense, useEffect, useState } from "react";
import titleBackgroundImage from "@/assets/images/headerPart/6.webp";
import NewGridViewItem from "./NewItems/NewGridViewItem";
import { BiGridAlt } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import NewListViewItem from "./NewItems/NewListViewItem";
import BlogSidebar from "./BlogSidebar";
import { Category, IBlog, IPagination, TBLogViewType } from "@/types/type";
import Pagination from "@/components/Common/Pagination";
import NoneFormSelectCustom from "@/components/Common/NoneFormSelectCustom";
import useQueryParams from "@/hooks/useQueryParam";
import { Empty } from "antd";
import Each from "@/lib/Each";

const listDanhMuc = [
  {
    key: "",
    value: "Tất cả bài viết",
  },
  {
    key: Category.TIPS,
    value: "Kiến thức & mẹo",
  },
  {
    key: Category.ABOUT,
    value: "Về Lavor",
  },

  {
    key: Category.RECRUITMENT,
    value: "Tuyển dụng",
  },
];
interface INews {
  filterBlogs: IBlog[];
  allBlogs: IBlog[];
  pagination: IPagination;
}

const News: React.FC<INews> = ({ filterBlogs, allBlogs, pagination }) => {
  if (!Array.isArray(filterBlogs)) return null;
  const { deleteQueryParam, getQueryParam, setQueryParam } = useQueryParams();

  const [selectedCategory, setSelectedCategory] = useState<any>();
  const typeView: TBLogViewType =
    (getQueryParam("view") as TBLogViewType) ?? "grid";
  const currentPage = getQueryParam("page") ?? 1;
  const category = getQueryParam("category");

  useEffect(() => {
    setSelectedCategory(category as Category);
  }, []);

  useEffect(() => {
    setSelectedCategory(category as Category);
  }, [category]);

  const handleChangeCategory = (a: any) => {
    setQueryParam({ category: a.key, page: "1" });
  };

  const handleChangeViewOption = (view: string) => {
    if (!view) {
      deleteQueryParam("view");
    } else {
      setQueryParam({ view: view });
    }
  };

  const handlePageChange = (page: number) => {
    setQueryParam({ page: page.toString() });
  };

  const startIndex = (Number(pagination?.page) - 1) * Number(pagination?.limit);
  const endIndex = Math.min(
    startIndex + Number(pagination?.limit) - 1,
    Number(pagination?.total) - 1
  );

  const renderListBlog = (blogs: IBlog[], typeOfView: TBLogViewType) => {
    if (blogs.length === 0) {
      return (
        <div className="flex justify-center mt-40 flex-col items-center">
          <Empty
            description={
              <span className="text-white">Chưa có bài viết nào</span>
            }
          />
        </div>
      );
    }

    const ViewComponent =
      typeOfView === "grid" ? NewGridViewItem : NewListViewItem;

    return (
      <div
        className={`grid grid-cols-1 ${
          typeOfView === "grid" ? "md:grid-cols-2" : ""
        } gap-10`}
      >
        <Each
          of={blogs}
          render={(item) => <ViewComponent blog={item} key={item.blog_id} />}
        />
      </div>
    );
  };

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
              <div className="mb-5 flex items-center justify-between">
                <NoneFormSelectCustom
                  onChange={(a) => handleChangeCategory(a)}
                  options={listDanhMuc}
                  className="user"
                  placeholder="Danh mục"
                  value={selectedCategory}
                />
                <div className="border border-solid border-[#222121] py-2 px-5 flex items-center gap-10 text-white">
                  <p className="text-gray text-[15px] hidden md:block">
                    Hiển thị từ {startIndex + 1} - {endIndex + 1} /{" "}
                    {pagination?.total} bài viết
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
              </div>

              <Suspense
                fallback={<div className="text-white text-6xl">Loading</div>}
              >
                {renderListBlog(filterBlogs, typeView)}
              </Suspense>

              <div className="mt-5">
                <Pagination
                  currentPage={Number(currentPage)}
                  totalPages={Math.ceil(
                    pagination?.total / Number(pagination?.limit)
                  )}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            <div className="col-span-1">
              <BlogSidebar blogs={allBlogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
