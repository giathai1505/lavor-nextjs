import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import PhoneHeader from "@/components/Common/PhoneHeader";

import HomePage from "@/pages/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lavor - Sang trọng, đẳng cấp",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

export default function Home() {
  return (
    <div>
      <div className="hidden xl:block">
        <Header />
      </div>

      <div className="block xl:hidden">
        <PhoneHeader />
      </div>

      <HomePage />
      <Footer />
    </div>
  );
}
