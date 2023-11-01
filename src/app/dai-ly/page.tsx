import Image from "next/image";
import React from "react";
import Agency from "@/pages/Agency";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đại lý toàn quốc",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = () => {
  return (
    <div className="bg-black">
      <Agency />
    </div>
  );
};

export default index;
