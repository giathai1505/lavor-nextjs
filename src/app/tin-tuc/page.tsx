import News from "@/pages/News";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = () => {
  return <News />;
};

export default index;
