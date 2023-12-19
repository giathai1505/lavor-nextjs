"use client";
import CarManagementForm from "@/admin/CarManagement/CarManagementForm";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import { IBrand, IYear } from "@/types/type";
import React, { useEffect, useState } from "react";

async function getAllYears() {
  const res = await fetch(SERVER_API_ENPOINT + "design/years", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

async function getAllBrands() {
  const res = await fetch(SERVER_API_ENPOINT + "design/brands", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

const page = () => {
  const [listYears, setListYears] = useState<IYear[]>([]);
  const [listBrands, setListBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllYears(), getAllBrands()])
        .then((result) => {
          if (Array.isArray(result[0])) {
            setListYears(result[0]);
          } else {
            setListYears([]);
          }

          if (Array.isArray(result[1])) {
            setListBrands(result[1]);
          } else {
            setListBrands([]);
          }
        })
        .catch((error) => {
          setListBrands([]);
          setListYears([]);
        });
    };

    fetchData();
  }, []);

  return <CarManagementForm years={listYears} brands={listBrands} />;
};

export default page;
