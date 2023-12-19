import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import PhoneHeader from "@/components/Common/PhoneHeader";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import HomePage from "@/pages/Home";
import { IProduct } from "@/types/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lavor - Sang trọng, đẳng cấp",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

async function getAllProducts() {
  try {
    const res = await fetch(SERVER_API_ENPOINT + "products?type=PILLOW", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

const Home = async () => {
  const res = await getAllProducts();
  const products: IProduct[] = res?.products ? res.products : [];

  return (
    <div>
      <div className="hidden xl:block">
        <Header />
      </div>

      <div className="block xl:hidden">
        <PhoneHeader />
      </div>

      <HomePage products={products} />
      <Footer />
    </div>
  );
};

export default Home;
