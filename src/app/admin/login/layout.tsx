import React from "react";
import authBg from "@/assets/images/background/auth-bg.webp";
import Image from "next/image";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex justify-end my-auto py-20 pr-32">{children}</div>
      <div className="auth-bg relative">
        <Image
          src={authBg}
          alt="Hình ảnh xe"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-[rgba(30,41,59,0.9)]"></div>
      </div>
    </div>
  );
}
