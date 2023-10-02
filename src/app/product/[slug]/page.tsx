import DetailProduct from "@/pages/Product/DetailProduct";
import React from "react";
interface IPageProps {
  params: { slug: string };
}
const index: React.FC<IPageProps> = ({ params }) => {
  return <DetailProduct productID={params.slug} />;
};

export default index;
