import { SERVER_API_ENPOINT } from "@/constants/server.env";
import News from "@/pages/News";
import { IPagination } from "@/types/type";
import { Metadata } from "next";
import React from "react";

async function getAllBlog(url: string) {
  try {
    const res = await fetch(SERVER_API_ENPOINT + "blogs" + url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = async (props: any) => {
  const category = props?.searchParams?.category;
  const categoryURL =
    category && category !== ""
      ? "&category=" + props?.searchParams?.category
      : "";

  const url = `?page=${props.searchParams.page ?? "1"}&limit=8` + categoryURL;

  const response = await getAllBlog(url);
  const res2 = await getAllBlog("");

  let filterBlogs = [];
  let allBlogs = [];

  if (response?.blogs && Array.isArray(response.blogs)) {
    filterBlogs = response?.blogs;
  }

  if (res2?.blogs && Array.isArray(res2.blogs)) {
    allBlogs = res2?.blogs;
  }

  const pagination: IPagination = {
    total: response?.total ?? 10,
    page: response?.page ?? 1,
    limit: response?.limit ?? 10,
  };

  return (
    <News
      filterBlogs={filterBlogs}
      allBlogs={allBlogs}
      pagination={pagination}
    />
  );
};

export default index;
