import BlogAdminForm from "@/admin/BlogManagement/BlogAdminForm";
import { Category, Status } from "@/types/type";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Thêm sản phẩm mới",
  description: "Thêm sản phẩm mới",
};

const page = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }
  const defaultBlogsValue = {
    blog_title: "",
    blog_description: "",
    blog_image_url: "",
    blog_content: "",
    blog_category: Category.ABOUT,
    blog_status: Status.ACTIVE,
  };
  return <BlogAdminForm isEdit={false} defaultValue={defaultBlogsValue} />;
};

export default page;
