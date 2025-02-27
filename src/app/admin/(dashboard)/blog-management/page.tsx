import BlogAdminTable from "@/admin/BlogManagement/BlogAdminTable";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import { IBlog } from "@/types/type";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quản lý bài viết",
  description: "Quản lý bài viết",
};

async function getAllBlog() {
  const res = await fetch(SERVER_API_ENPOINT + "blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const BlogAdmin = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }

  const res = await getAllBlog();

  const blogs: IBlog[] = res?.blogs ? res?.blogs : [];

  return <BlogAdminTable blogs={blogs} />;
};

export default BlogAdmin;
