import React from "react";
import LeatherSeatCover from "./LeatherSeatCover";
import NeckPillow from "./NeckPillow";
import PartHeader from "@/components/Common/PartHeader";
import CategoryList from "./CategoryList";
import Image from "next/image";
import titleBackgroundImage from "@/assets/images/headerPart/3.webp";
import carBanner from "@/assets/images/banner/1.jpeg";
import ProductItemHorizontal from "./components/ProductItemHorizontal";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { IBlog, IProduct, ProductType, ProductTypeToText } from "@/types";
import NewGridViewItem from "../News/NewItems/NewGridViewItem";

interface IProductProps {
  products: IProduct[];
  blogs: IBlog[];
}

const renderProductByCategory = (
  products: IProduct[],
  type: ProductType,
  url: string
) => {
  return (
    <div>
      <p className="font-bold text-xl text-primary mb-10 uppercase">
        {ProductTypeToText[type]}
      </p>

      {products
        .filter((item) => item.product_type === type)
        .map((p, index) => {
          if (index >= 3) return <></>;
          return <ProductItemHorizontal product={p} />;
        })}

      <div className="flex justify-end">
        <Link
          href={url}
          className="flex items-center gap-2 border border-solid border-gray text-primary hover:border-0  hover:bg-primary hover:text-white  mr-12  rounded-sm px-2 py-1 text-xs w-fit"
        >
          <span>Xem thêm</span>
          <BsArrowRightShort />
        </Link>
      </div>
    </div>
  );
};

const calculateNumProductOfCategory = (products: IProduct[]) => {
  return products.reduce((result, item) => {
    if (result.has(item.product_type)) {
      const oldValue = result.get(item.product_type) || 0;
      result.set(item.product_type, oldValue + 1);
    } else {
      result.set(item.product_type, 1);
    }

    return result;
  }, new Map<string, number>());
};

const Product: React.FC<IProductProps> = ({ products, blogs }) => {
  return (
    <div className="bg-black">
      <PartHeader
        breadcrumb="Sản phẩm"
        title=""
        backgroundImage={titleBackgroundImage}
      />

      <div className="wrapper pt-5">
        <CategoryList listValue={calculateNumProductOfCategory(products)} />
      </div>
      <div className="wrapper pt-5">
        <LeatherSeatCover />
      </div>

      <div className="w-full h-[300px] product-banner mt-10"></div>

      <div className="wrapper">
        <NeckPillow
          listPillow={products.filter(
            (item) => item.product_type === ProductType.PILLOW
          )}
        />
      </div>

      <div className="wrapper">
        <Image
          alt=""
          src={carBanner}
          className="w-full h-[300px] object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-5 text-white wrapper py-20">
        {renderProductByCategory(
          products,
          ProductType.FLOOR,
          "/san-pham/tham-lot-san"
        )}
        {renderProductByCategory(
          products,
          ProductType.STEERING_WHEEL,
          "/san-pham/boc-ghe-da"
        )}
        {renderProductByCategory(
          products,
          ProductType.OTHER,
          "/san-pham/san-pham-khac"
        )}
      </div>

      <div className="wrapper mb-20">
        <div className="flex justify-between items-center gap-20 mb-10">
          <p className="text-primary font-bold text-3xl">BÀI VIẾT MỚI NHẤT</p>

          <div className="flex-1 flex justify-end">
            <div className="w-2/3  h-[1px] bg-[#80808059]"></div>
          </div>
          <Link
            href="/san-pham/goi-co"
            className="flex items-center gap-2 bg-white text-primary hover:bg-primary hover:text-white rounded-sm px-3 py-2 w-fit"
          >
            <span>Xem tất cả bài viết</span>
            <BsArrowRightShort />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {blogs.map((item, index) => {
            if (index > 2) return <></>;
            return <NewGridViewItem blog={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
