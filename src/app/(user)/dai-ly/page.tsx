import React from "react";
import Agency from "@/pages/Agency";
import { Metadata } from "next";
import { API_ENPOINT } from "@/constants/api";

export const metadata: Metadata = {
  title: "Đại lý toàn quốc",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

async function getAllAgency() {
  try {
    const res = await fetch(API_ENPOINT + "agencies", {
      cache: "no-store",
    });
  
    if (!res.ok) {
      return null
    }
  
    return res.json();
  } catch (error) {
    return null
  }

}

const index = async () => {
  const response = await getAllAgency();

  let agencies = [];
  if (response?.regions && Array.isArray(response?.regions)) {
    agencies = response?.regions;
  }
  return (
    <div className="bg-[#000000e8]">
      <Agency agencies={agencies} />
    </div>
  );
};

export default index;
