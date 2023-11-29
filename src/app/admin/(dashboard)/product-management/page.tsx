"use client";
import withAuth from "@/HOC/withAuth";
import ProductManagement from "@/admin/ProductManagement";
import { API_ENPOINT } from "@/constants/api";
import { IProduct } from "@/types";
import React, { useEffect, useState } from "react";

async function getAllProducts() {
  const res = await fetch(API_ENPOINT + "products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();

        if (response?.products) {
          setProducts(response.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setProducts([]);
      }
    };

    fetchData();
  }, []);

  return <ProductManagement products={products} loading={false} />;
};

export default withAuth(page);
