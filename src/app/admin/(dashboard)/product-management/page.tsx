import ProductManagement from "@/admin/ProductManagement";
import { API_ENPOINT } from "@/constants/api";
import { IProduct } from "@/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm",
  description: "Quản lý sản phẩm",
};

async function getAllProducts() {
  const res = await fetch(API_ENPOINT + "products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/auth/login");
  }
  const res = await getAllProducts();

  const products: IProduct[] = res?.products ? res?.products : [];

  return <ProductManagement products={products} />;
};

export default page;
