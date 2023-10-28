import Design from "@/pages/Design";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chọn thiết kế riêng của bạn",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const page = () => {
  return (
    <div>
      <Design />
    </div>
  );
};

export default page;
