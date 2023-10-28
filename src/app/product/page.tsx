import Product from "@/pages/Product";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = () => {
  return <Product />;
};

export default index;
