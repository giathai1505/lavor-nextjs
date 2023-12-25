import Footer from "@/components/Common/Footer";
import Header from "@/components/Header/Header";
import PhoneHeader from "@/components/Header/PhoneHeader";
import { Metadata } from "next";
import React from "react";

export default function AboutUsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="hidden xl:block">
        <Header />
      </div>

      <div className="block xl:hidden">
        <PhoneHeader />
      </div>
      {children}
      <Footer />
    </div>
  );
}
