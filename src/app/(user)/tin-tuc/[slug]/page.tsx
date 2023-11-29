import { getAllBlogs } from "@/api/blog";
import { API_ENPOINT } from "@/constants/api";
import DetailNews from "@/pages/News/DetailNews";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

interface IPageProps {
  params: { slug: string };
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

async function getRelatedBlog(CategoryId: string) {
  const url = "?page=1&limit=10" + "&category=" + CategoryId;

  const res = await getAllBlogs(url);

  return res;
}

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blogID = params.slug.split("-");

  const id = blogID[blogID.length - 1];

  const blog = await getBlogByID(id);

  return {
    title: blog.blog_title,
    description: blog.blog_description,
  };
}

const index: React.FC<IPageProps> = async ({ params }) => {
  const blogID = params.slug.split("-");

  const id = blogID[blogID.length - 1];

  const blog = await getBlogByID(id);

  let relatedBlogs = [];

  if (blog.blog_category) {
    relatedBlogs = await getRelatedBlog(blog.blog_category.toString());
  }

  let blogs = relatedBlogs.blogs;

  if (Array.isArray(blogs) && blogs.length > 0) {
    blogs = blogs.filter((item) => item.blog_id.toString() !== id);
  }
  return <DetailNews blog={blog} relatedBlogs={blogs} />;
};

export default index;
