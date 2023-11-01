import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import { Metadata } from "next";
import React from "react";

export default function AboutUsLayout({
  children, // will be a page or nested layout
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
