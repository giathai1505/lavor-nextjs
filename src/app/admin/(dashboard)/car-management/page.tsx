import CarManagement from "@/admin/CarManagement";
import { API_ENPOINT } from "@/constants/api";
import React from "react";

async function getAllBlog() {
  const res = await fetch(API_ENPOINT + "blogs?page=1&limit=10", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  let response = await getAllBlog();

  return <CarManagement blogs={response?.blogs} loading={false} />;
};

export default page;
