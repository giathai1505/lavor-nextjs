import AddNewBlog from "@/admin/BlogManagement/AddNewBlog";
import { API_ENPOINT } from "@/constants/api";
import { Category, Status } from "@/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sửa thông tin sản phẩm",
  description: "Sửa thông tin sản phẩm",
};
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

const page: React.FC<IPageProps> = async ({ params }) => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }
  const blog = await getBlogByID(params.blogID);

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

export default page;
