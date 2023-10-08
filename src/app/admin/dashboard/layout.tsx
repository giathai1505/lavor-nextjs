"use client";
import AdminSidebar from "@/admin/Components/AdminSidebar";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  return (
    <div className="">
      <AdminSidebar show={isShowSidebar} />
      <div className={`admin-dashboard-header ${isShowSidebar ? "show" : ""}`}>
        <div
          className="admin-dashboard-header-iconBar"
          onClick={() => setIsShowSidebar((pre) => !pre)}
        >
          <FaBars />
        </div>
      </div>
      <div className="dashboard-content-wrapper">{children}</div>
    </div>
  );
}
