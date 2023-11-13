import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import { Jost } from "next/font/google";
import React from "react";

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function NewsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={jost.className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
