import AdminDashboard from "@/admin/Dashboard";
import React from "react";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";

const page = async () => {
  const data = await getServerSession()

  if (!data?.user) {
    redirect('/admin/auth/login')
  }

  return <AdminDashboard />;
};
export default page
