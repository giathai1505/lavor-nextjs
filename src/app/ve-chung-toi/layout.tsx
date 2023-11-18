import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import PhoneHeader from "@/components/Common/PhoneHeader";
import React from "react";

export default function AboutUsLayout({
  children,
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
