import React from "react";
import LeatherSeatCover from "./LeatherSeatCover";
import NeckPillow from "./NeckPillow";

const Product = () => {
  return (
    <div className="pt-10 bg-black ">
      <div className="mt-28"></div>
      <div className="wrapper">
        <LeatherSeatCover />
      </div>
      <div className="w-full h-[500px] product-banner mt-10"></div>
      <div className="wrapper">
        <NeckPillow />
      </div>
    </div>
  );
};

export default Product;
