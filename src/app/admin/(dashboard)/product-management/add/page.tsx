"use client";
import ProductForm from "@/admin/ProductManagement/AddNewProduct";
import { Category, PStatus, ProductType, Status } from "@/types";
import React from "react";

const page = () => {
  const defaultValue = {
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
  return <ProductForm isEdit={false} defaultValue={defaultValue} />;
};

export default page;
