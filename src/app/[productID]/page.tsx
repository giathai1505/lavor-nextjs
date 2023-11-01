import PartHeader from "@/components/Common/PartHeader";
import DetailProduct from "@/pages/DetailProduct";
import React from "react";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";

const index = () => {
  return (
    <div>
      <PartHeader
        breadcrumb="Sẩn phẩm"
        title="Sản phẩm"
        backgroundImage={titleBackgroundImage}
      />

      <DetailProduct />
    </div>
  );
};

export default index;
