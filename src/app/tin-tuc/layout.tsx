import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import React from "react";

export default function NewsLayout({
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
