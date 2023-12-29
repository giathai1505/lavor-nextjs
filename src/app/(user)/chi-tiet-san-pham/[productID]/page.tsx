import PartHeader from "@/components/Common/PartHeader";
import DetailProduct from "@/pages/DetailProduct";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import { IProduct } from "@/types/type";


async function getProductByID(id: string) {
  const res = await fetch(SERVER_API_ENPOINT + "products/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getProductCategory(url: string) {
  const res = await fetch(SERVER_API_ENPOINT + "products/" + url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface IPageProps {
  params: { productID: string };
}
const index: React.FC<IPageProps> = async ({ params }) => {
  const product = (await getProductByID(params.productID)) as IProduct;

  let relatedProducts: IProduct[] = [];

  const categoryProducts = await getProductCategory(
    "?type=" + product.product_type ?? ""
  );

  if (
    Array.isArray(categoryProducts?.products) &&
    categoryProducts?.products.length > 0
  ) {
    relatedProducts = categoryProducts.products.filter(
      (item: any) => item.product_id !== product.product_id
    );
  }

  return (
    <div>
      <PartHeader
        breadcrumb="Sản phẩm"
        title="Sản phẩm"
        backgroundImage={titleBackgroundImage}
      />

      <DetailProduct product={product} relatedProducts={relatedProducts} />
    </div>
  );
};

export default index;
