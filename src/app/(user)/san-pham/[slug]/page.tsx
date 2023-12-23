import PartHeader from "@/components/Common/PartHeader";
import ListProduct from "@/pages/Product/ListProduct";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import { SlugToType } from "@/types/type";

async function getProductCategory(url: string) {
  try {
    const res = await fetch(SERVER_API_ENPOINT + "products/" + url, {
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

interface IPageProps {
  params: { slug: string };
}

const page: React.FC<IPageProps> = async ({ params }) => {
  const url = "?type=" + SlugToType[params.slug as keyof typeof SlugToType];

  const products = await getProductCategory(url);

  return (
    <div>
      <PartHeader
        breadcrumb="Sản phẩm"
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

export default page;
