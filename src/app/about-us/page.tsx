import AboutUs from "@/pages/AboutUs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = () => {
  return <AboutUs />;
};

export default index;
