import React from "react";
import authBg from "@/assets/images/admin/auth-bg.jpeg";
import Image from "next/image";

export default function AdminAuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex justify-end my-auto py-20 pr-32">{children}</div>
      <div className="auth-bg relative">
        <Image
          src={authBg}
          alt=""
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-[rgba(30,41,59,0.9)]"></div>
      </div>
    </div>
  );
}
