import { API_ENPOINT } from "@/constants/api";
import Design from "@/pages/Design";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chọn thiết kế riêng của bạn",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

async function getAllYears() {
  const res = await fetch(API_ENPOINT + "design/years", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

async function getAllBrands() {
  const res = await fetch(API_ENPOINT + "design/brands", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

const page = async () => {
  const years = await getAllYears();

  const brands = await getAllBrands();
  return (
    <div>
      <Design years={years} brands={brands} />
    </div>
  );
};

export default page;
