"use client";
import withAuth from "@/HOC/withAuth";
import AddNewBlog from "@/admin/BlogManagement/AddNewBlog";
import { API_ENPOINT } from "@/constants/api";
import { Category, IBlog, Status } from "@/types";
import React, { useEffect, useState } from "react";

interface IPageProps {
  params: { blogID: string };
}

async function getBlogByID(id: string) {
  const res = await fetch(API_ENPOINT + "blogs/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const defaultBlogsValue = {
  blog_title: "",
  blog_description: "",
  blog_image_url: "",
  blog_content: "",
  blog_category: Category.ABOUT,
  blog_status: Status.ACTIVE,
};

const index: React.FC<IPageProps> = ({ params }) => {
  const [blog, setBlog] = useState<IBlog | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogByID(params.blogID);

        if (response) {
          setBlog(response);
        } else {
          setBlog(undefined);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlog(undefined);
      }
    };

    fetchData();
  }, []);

  const defaultValue = blog
    ? {
        blog_title: blog?.blog_title ?? "",
        blog_description: blog?.blog_description ?? "",
        blog_image_url: blog?.blog_image_url ?? "",
        blog_category: blog?.blog_category ?? Category.ABOUT,
        blog_status: blog?.blog_status ?? Status.ACTIVE,
        blog_content: blog?.blog_content ?? "",
      }
    : defaultBlogsValue;

  return (
    <div>
      <AddNewBlog
        isEdit={true}
        defaultValue={defaultValue}
        blogID={params.blogID}
      />
    </div>
  );
};

export default withAuth(index);
