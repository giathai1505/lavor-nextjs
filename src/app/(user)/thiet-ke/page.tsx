import { SERVER_API_ENPOINT } from "@/constants/server.env";
import Design from "@/pages/Design";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chọn thiết kế riêng của bạn",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

async function getAllYears() {
  try {
    const res = await fetch(SERVER_API_ENPOINT + "design/years", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

async function getAllBrands() {
  try {
    const res = await fetch(SERVER_API_ENPOINT + "design/brands", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
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
