import { API_ENPOINT } from "@/constants/api";
import News from "@/pages/News";
import { IPagination } from "@/types";
import { Metadata } from "next";
import React from "react";

async function getAllBlog(url: string) {
  const res = await fetch(API_ENPOINT + "blogs" + url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = async (props: any) => {
  const url = `?page=${props.searchParams.page ?? "1"}&limit=2`;

  const response = await getAllBlog(url);

  let blogs = [];

  if (response?.blogs && Array.isArray(response.blogs)) {
    blogs = response?.blogs;
  }
  const pagination: IPagination = {
    total: response?.total ?? 10,
    page: response?.page ?? 1,
    limit: response?.limit ?? 10,
  };

  return <News blogs={blogs} pagination={pagination} />;
};

export default index;
