import AddNewBlog from "@/admin/BlogManagement/AddNewBlog";
import { API_ENPOINT } from "@/constants/api";
import { Category, Status } from "@/types";
import React from "react";

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

const index: React.FC<IPageProps> = async ({ params }) => {
  const blog = await getBlogByID(params.blogID);

  console.log("Blog: ", blog);
  const defaultValue = {
    blog_title: blog?.blog_title ?? "",
    blog_description: blog?.blog_description ?? "",
    blog_image_url: blog?.blog_image_url ?? "",
    blog_category: blog?.blog_category ?? Category.ABOUT,
    blog_status: blog?.blog_status ?? Status.ACTIVE,
    blog_content: blog?.blog_content ?? "",
  };

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

export default index;
