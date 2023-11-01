import PartHeader from "@/components/Common/PartHeader";
import ListProduct from "@/pages/Product/ListProduct";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";

interface IPageProps {
  params: { slug: string };
}
const index: React.FC<IPageProps> = ({ params }) => {
  console.log(params);
  return (
    <div>
      <PartHeader
        breadcrumb="Sẩn phẩm"
        title="Sản phẩm"
        backgroundImage={titleBackgroundImage}
      />
      <ListProduct categoryID={params.slug} />;
    </div>
  );
};

export default index;
