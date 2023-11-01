import React from "react";
import DetailImage from "./DetailImage";
import DetailContent from "./DetailContent";
import ProductDesc from "./ProductDesc";
import RelatedProduct from "./RelatedProduct";

const listProductImgs = [
  "https://lavorluxury.com/wp-content/uploads/2022/10/20.png",
  "https://lavorluxury.com/wp-content/uploads/2022/10/18.png",
  "https://lavorluxury.com/wp-content/uploads/2022/10/16.png",
  "https://lavorluxury.com/wp-content/uploads/2022/10/13.png",
];

const DetailProduct = () => {
  return (
    <div className="bg-black py-14">
      <div className="wrapper">
        <div className="grid grid-cols-2 gap-10">
          <DetailImage productImgs={listProductImgs} />
          <DetailContent />
        </div>

        <ProductDesc />
        <RelatedProduct />
      </div>
    </div>
  );
};

export default DetailProduct;
