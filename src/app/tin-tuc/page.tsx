import { API_ENPOINT } from "@/constants/api";
import News from "@/pages/News";
import { Metadata } from "next";
import React from "react";

async function getAllBlog() {
  const res = await fetch(API_ENPOINT + "blogs?page=1&limit=10", {
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

const index = async () => {
  const blogs = await getAllBlog();

  return <News blogs={blogs?.blogs ?? []} />;
};

export default index;
