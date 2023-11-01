import React from "react";
import LeatherSeatCover from "./LeatherSeatCover";
import NeckPillow from "./NeckPillow";
import PartHeader from "@/components/Common/PartHeader";
import CategoryList from "./CategoryList";
import Image from "next/image";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";
import carBanner from "@/assets/images/banner/1.jpeg";
import ProductItemHorizontal from "./components/ProductItemHorizontal";
import LatestNews from "./LatestNews";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { bocTayLai, sanPhamKhac, thamLotSan } from "@/data/products";

const Product = () => {
  return (
    <div className="bg-black">
      <PartHeader
        breadcrumb="Sản phẩm"
        title=""
        backgroundImage={titleBackgroundImage}
      />

      <div className="wrapper pt-5">
        <CategoryList />
      </div>
      <div className="wrapper pt-5">
        <LeatherSeatCover />
      </div>
      <div className="w-full h-[300px] product-banner mt-10"></div>
      <div className="wrapper">
        <NeckPillow />
      </div>

      <div className="wrapper">
        <Image
          alt=""
          src={carBanner}
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-5 text-white wrapper py-20">
        <div>
          <p className="font-bold text-xl text-primary mb-10">THẢM LÓT SÀN</p>

          {thamLotSan.map((item) => {
            return <ProductItemHorizontal product={item} />;
          })}

          <div className="flex justify-end">
            <Link
              href="/san-pham/tham-lot-san"
              className="flex items-center gap-2 border border-solid border-gray text-primary hover:border-0  hover:bg-primary hover:text-white  mr-12  rounded-sm px-2 py-1 text-xs w-fit"
            >
              <span>Xem thêm</span>
              <BsArrowRightShort />
            </Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl text-primary mb-10">BỌC TAY LÁI</p>

          {bocTayLai.map((item) => {
            return <ProductItemHorizontal product={item} />;
          })}

          <div className="flex justify-end">
            <Link
              href="/san-pham/boc-tay-lai"
              className="flex items-center gap-2 border border-solid border-gray text-primary hover:border-0  hover:bg-primary hover:text-white  mr-12  rounded-sm px-2 py-1 text-xs w-fit"
            >
              <span>Xem thêm</span>
              <BsArrowRightShort />
            </Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl text-primary mb-10">SẢN PHẨM KHÁC</p>

          {sanPhamKhac.map((item) => {
            return <ProductItemHorizontal product={item} />;
          })}

          <div className="flex justify-end">
            <Link
              href="/san-pham/san-pham-khac"
              className="flex items-center gap-2 border border-solid border-gray text-primary hover:bg-primary hover:text-white hover:border-0 mr-12 rounded-sm px-2 py-1 text-xs w-fit"
            >
              <span>Xem thêm</span>
              <BsArrowRightShort />
            </Link>
          </div>
        </div>
      </div>

      <div className="wrapper mb-20">
        <LatestNews />
      </div>
    </div>
  );
};

export default Product;
