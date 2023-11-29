"use client";
import withAuth from "@/HOC/withAuth";
import AdminDashboard from "@/admin/Dashboard";
import React from "react";

const page = () => {
  return <AdminDashboard />;
};

export default withAuth(page);
