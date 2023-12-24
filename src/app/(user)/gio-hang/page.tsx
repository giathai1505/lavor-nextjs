import React from "react";
import { Metadata } from "next";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/1.webp";
import CartTable from "@/pages/Cart/CartTable";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Giỏ hàng của bạn",
};

const UserCartPage = () => {
  return (
    <div>
      <PartHeader
        breadcrumb="Giỏ hàng"
        title="GIỎ HÀNG"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black">
        <div className="wrapper">
          <div className="p-5 md:p-10 xl:p-0 text-white">
            <CartTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartPage;
