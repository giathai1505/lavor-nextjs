"use client";
import AddNewBlog from "@/admin/BlogManagement/AddNewBlog";
import { Category, Status } from "@/types";
import React from "react";

const page = () => {
  const defaultValue = {
    blog_title: "",
    blog_description: "",
    blog_image_url: "",
    blog_content: "",
    blog_category: Category.ABOUT,
    blog_status: Status.ACTIVE,
  };
  return <AddNewBlog isEdit={false} defaultValue={defaultValue} />;
};

export default page;
