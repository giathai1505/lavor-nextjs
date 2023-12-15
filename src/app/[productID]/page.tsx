import PartHeader from "@/components/Common/PartHeader";
import DetailProduct from "@/pages/DetailProduct";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";
import { API_ENPOINT } from "@/constants/api";
import { Metadata, ResolvingMetadata } from "next";
import Product from "@/pages/Product";
import { IProduct } from "@/types/type";

async function getProductByID(id: string) {
  const res = await fetch(API_ENPOINT + "products/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getProductCategory(url: string) {
  const res = await fetch(API_ENPOINT + "products/" + url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// async function getRelatedBlog(CategoryId: string) {
//   const url = "?page=1&limit=10" + "&category=" + CategoryId;

//   const res = await getAllBlogs(url);

//   return res;
// }

// export async function generateMetadata(
//   { params, searchParams }: any,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // const blogID = params.slug.split("-");

//   // const id = blogID[blogID.length - 1];

//   const product = await getProductByID(params.productID);

//   return {
//     title: product.,
//     description: product.blog_description,
//   };
// }

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
        breadcrumb="Sẩn phẩm"
        title="Sản phẩm"
        backgroundImage={titleBackgroundImage}
      />

      <DetailProduct product={product} relatedProducts={relatedProducts} />
    </div>
  );
};

export default index;
