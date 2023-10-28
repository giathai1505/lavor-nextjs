import React from "react";
import LeatherSeatCover from "./LeatherSeatCover";
import NeckPillow from "./NeckPillow";
import PartHeader from "@/components/Common/PartHeader";
const titleBackgroundImage =
  "https://images.pexels.com/photos/132657/pexels-photo-132657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Product = () => {
  return (
    <div className="bg-black">
      <PartHeader
        breadcrumb="Sản phẩm"
        title=""
        backgroundImage={titleBackgroundImage}
      />
      <div className="wrapper pt-5">
        <LeatherSeatCover />
      </div>
      <div className="w-full h-[300px] product-banner mt-10"></div>
      <div className="wrapper">
        <NeckPillow />
      </div>
    </div>
  );
};

export default Product;
