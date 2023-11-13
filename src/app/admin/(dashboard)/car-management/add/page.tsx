import CarManagementForm from "@/admin/CarManagement/CarManagementForm";
import { API_ENPOINT } from "@/constants/api";
import { Category, Status } from "@/types";
import React from "react";

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

  const defaultValue = {
    year: years[0]?.year,
    brand_id: brands[0]?.brand_id,
    model_id: brands[0]?.models[0]?.model_id ?? NaN,
    version_id: brands[0]?.models[0]?.versions[0]?.version_id ?? NaN,
    image_url: "",
  };

  return (
    <CarManagementForm
      isEdit={false}
      defaultValue={defaultValue}
      years={years}
      brands={brands}
      models={brands[0]?.models ?? []}
      versions={brands[0]?.models[0]?.versions ?? []}
    />
  );
};

export default page;
