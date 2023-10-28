import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
