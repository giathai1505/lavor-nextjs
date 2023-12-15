import CarManagementForm from "@/admin/CarManagement/CarManagementForm";
import { API_ENPOINT } from "@/constants/api";
import { IBrand, IYear } from "@/types/type";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý xe",
  description: "Quản lý xe",
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
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }

  const years = await getAllYears();
  const brands = await getAllBrands();

  const listYears: IYear[] = years ? years : [];
  const listBrands: IBrand[] = brands ? brands : [];

  return (
    <CarManagementForm isEdit={false} years={listYears} brands={listBrands} />
  );
};

export default page;
