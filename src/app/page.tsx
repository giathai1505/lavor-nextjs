import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import HomePage from "@/pages/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lavor - Sang trọng, đẳng cấp",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

export default function Home() {
  return (
    <div>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
