import PartHeader from "@/components/Common/PartHeader";
import ListProduct from "@/pages/Product/ListProduct";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";
import { Jost } from "next/font/google";
import { API_ENPOINT } from "@/constants/api";
import { SlugToTitle, SlugToType } from "@/types";

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

async function getProductCategory(url: string) {
  const res = await fetch(API_ENPOINT + "products/" + url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface IPageProps {
  params: { slug: string };
}
const index: React.FC<IPageProps> = async ({ params }) => {
  const url = "?type=" + SlugToType[params.slug as keyof typeof SlugToType];

  const products = await getProductCategory(url);

  return (
    <div className={jost.className}>
      <PartHeader
        breadcrumb="Sẩn phẩm"
        title="Sản phẩm"
        backgroundImage={titleBackgroundImage}
      />
      <ListProduct
        categoryID={params.slug}
        products={products.products}
        slug={params.slug}
      />
    </div>
  );
};

export default index;
