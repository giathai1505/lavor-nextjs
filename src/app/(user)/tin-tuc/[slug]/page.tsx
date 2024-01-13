import { SERVER_API_ENPOINT } from "@/constants/server.env";
import DetailNews from "@/pages/News/DetailNews";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

interface IPageProps {
  params: { slug: string };
}

async function getBlogByID(id: string) {
  const res = await fetch(SERVER_API_ENPOINT + "blogs/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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

async function getRelatedBlog(CategoryId: string) {
  const url = "?page=1&limit=10" + "&category=" + CategoryId;

  const res = await getAllBlog(url);

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

  //get all blogs
  const res = await getAllBlog("");
  let allBlogs = [];
  if (res?.blogs && Array.isArray(res.blogs)) {
    allBlogs = res?.blogs;
  }

  let relatedBlogs = [];

  if (blog.blog_category) {
    relatedBlogs = await getRelatedBlog(blog.blog_category.toString());
  }

  let blogs = relatedBlogs.blogs;

  if (Array.isArray(blogs) && blogs.length > 0) {
    blogs = blogs.filter((item) => item.blog_id.toString() !== id);
  }
  return <DetailNews blog={blog} allBlogs={allBlogs} relatedBlogs={blogs} />;
};

export default index;
