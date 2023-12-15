import { API_ENPOINT } from "@/constants/api";
import Product from "@/pages/Product";
import { IBlog, IProduct } from "@/types/type";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

async function getAllProducts() {
  try {
    const res = await fetch(API_ENPOINT + "products", {
      cache: "no-store",
    });
  
    if (!res.ok) {
     return []
    }
  
    return res.json();
  } catch (error) {
    return []
  }

}

async function getAllBlog() {
  try {
    const res = await fetch(API_ENPOINT + "blogs?page=1&limit=10", {
      cache: "no-store",
    });
  
    if (!res.ok) {
      return []
    }
  
    return res.json();
  } catch (error) {
    return []
  }

}

const index = async () => {
  const products = await getAllProducts();
  const blogs = await getAllBlog();

  return (
    <Product
      products={products.products as IProduct[]}
      blogs={blogs.blogs as IBlog[]}
    />
  );
};

export default index;
