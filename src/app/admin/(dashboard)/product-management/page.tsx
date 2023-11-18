import BlogManagement from "@/admin/BlogManagement";
import ProductManagement from "@/admin/ProductManagement";
import { API_ENPOINT } from "@/constants/api";
import React from "react";

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
  let response = await getAllProducts();

  console.log(response);

  return <ProductManagement products={response?.products} loading={false} />;
};

export default page;
