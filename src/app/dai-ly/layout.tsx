import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import PhoneHeader from "@/components/Common/PhoneHeader";
import { Jost } from "next/font/google";
import React from "react";

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export default function AgencyLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={jost.className}>
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
