import AgencyManagement from "@/admin/AgencyManagement";
import { API_ENPOINT } from "@/constants/api";
import { IRegion } from "@/types";
import React from "react";

async function getAllAgency() {
  const res = await fetch(API_ENPOINT + "agencies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const response = await getAllAgency();

  return <AgencyManagement agencies={response?.regions as IRegion[]} />;
};

export default page;
