import React from "react";
import Contact from "@/pages/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = () => {
  return <Contact />;
};

export default index;
