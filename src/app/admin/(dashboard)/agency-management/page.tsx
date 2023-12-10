"use client";
import withAuth from "@/HOC/withAuth";
import AgencyManagement from "@/admin/AgencyManagement";
import { API_ENPOINT } from "@/constants/api";
import { IRegion } from "@/types";
import React, { useEffect, useState } from "react";

async function getAllAgency() {
  const res = await fetch(API_ENPOINT + "agencies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = () => {
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAgency();

        if (response?.regions) {
          setRegions(response?.regions);
        } else {
          setRegions([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setRegions([]);
      }
    };

    fetchData();
  }, []);
  return <AgencyManagement agencies={regions} />;
};

export default page;
