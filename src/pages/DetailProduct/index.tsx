import React from "react";
import DetailImage from "./DetailImage";
import DetailContent from "./DetailContent";
import RelatedProduct from "./RelatedProduct";
import { IProduct } from "@/types";
import parse from "html-react-parser";

interface IDetailProduct {
  product: IProduct;
  relatedProducts: IProduct[];
}

const DetailProduct: React.FC<IDetailProduct> = ({
  product,
  relatedProducts,
}) => {
  return (
    <div className="bg-black py-14">
      <div className="wrapper">
        <div className="grid grid-cols-2 gap-10">
          <DetailImage product={product} />
          <DetailContent product={product} />
        </div>

        <div className="blog-content db-desc-wrapper mt-40 pt-10">
          <p className="text-3xl font-bold text-primary mb-2">Mô tả sản phẩm</p>
          {parse(product.product_description)}
        </div>

        {relatedProducts.length > 0 && (
          <RelatedProduct products={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default DetailProduct;
