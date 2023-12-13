import ProductForm from "@/admin/ProductManagement/AddNewProduct";
import { PStatus, ProductType } from "@/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Thêm bài viết mới",
  description: "Thêm bài viết",
};

const defaultProductValue = {
  product_name: "",
  product_price: 0,
  product_description: "",
  product_feature: "",
  product_detail: [],
  variants: [],
  product_type: ProductType.FLOOR,
  product_meta: "",
  product_status: PStatus.ACTIVE,
  product_images: [],
};
const page = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }
  return <ProductForm isEdit={false} defaultValue={defaultProductValue} />;
};

export default page;
