"use client";
import withAuth from "@/HOC/withAuth";
import BlogManagement from "@/admin/BlogManagement";
import { API_ENPOINT } from "@/constants/api";
import { IBlog } from "@/types";
import React, { useEffect, useState } from "react";

async function getAllBlog() {
  const res = await fetch(API_ENPOINT + "blogs?page=1&limit=10", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBlog();

        if (response?.blogs) {
          setBlogs(response);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    fetchData();
  }, []);

  return <BlogManagement blogs={blogs} loading={false} />;
};

export default withAuth(BlogAdmin);
