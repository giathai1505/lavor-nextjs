import CarManagementTable from "@/admin/CarManagement/CarManagementTable";
import { API_ENPOINT } from "@/constants/api";
import { ICarTable } from "@/types/type";
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

async function getAllCars() {
  const res = await fetch(API_ENPOINT + "design/cars", {
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

  const res = await getAllCars();
  let cars: ICarTable[] = [];

  if (res?.cars && Array.isArray(res.cars)) cars = res.cars;
  return <CarManagementTable cars={cars} />;
};

export default page;
