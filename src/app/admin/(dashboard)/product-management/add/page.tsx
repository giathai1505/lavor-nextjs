"use client";
import withAuth from "@/HOC/withAuth";
import ProductForm from "@/admin/ProductManagement/AddNewProduct";
import { PStatus, ProductType } from "@/types";
import React from "react";
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
const page = () => {
  return <ProductForm isEdit={false} defaultValue={defaultProductValue} />;
};

export default withAuth(page);
