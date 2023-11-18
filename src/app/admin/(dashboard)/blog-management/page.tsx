import BlogManagement from "@/admin/BlogManagement";
import { API_ENPOINT } from "@/constants/api";
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

const BlogAdmin = async () => {
  const response = await getAllBlog();

  return <BlogManagement blogs={response?.blogs} loading={false} />;
};

export default BlogAdmin;
