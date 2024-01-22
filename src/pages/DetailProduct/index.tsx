"use client";
import React, { useState } from "react";
import DetailImage from "./DetailImage";
import DetailContent from "./DetailContent";
import RelatedProduct from "./RelatedProduct";
import { IProduct } from "@/types/type";
import parse from "html-react-parser";

export type TImageItem = {
  id: string;
  url: string;
};

const renderListImage = (product: IProduct) => {
  let startIndex = 0;
  let result: TImageItem[] = [];

  if (product.product_images.length > 0) {
    product.product_images.forEach((item) => {
      result.push({ id: startIndex.toString(), url: item });
      startIndex++;
    });
  }

  if (product.variants.length > 0) {
    product.variants.forEach((item) => {
      result.push({ id: item.variant_color, url: item.image_url });
    });
  }

  return result;
};

interface IDetailProduct {
  product: IProduct;
  relatedProducts: IProduct[];
}

const DetailProduct: React.FC<IDetailProduct> = ({
  product,
  relatedProducts,
}) => {
  if (!product) return null;
  const [activeVariant, setActiveVariant] = useState<TImageItem>(
    renderListImage(product)[0]
  );
  const [productImages, setProductImages] = useState<TImageItem[]>(
    renderListImage(product)
  );

  const handleChangeColor = (color: string) => {
    const colorImage = productImages.find((item) => item.id === color);
    if (colorImage) setActiveVariant(colorImage);
  };

  return (
    <div className="bg-black p-5 md:p-10 xl:px-0 xl:py-16">
      <div className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <DetailImage
            productImages={renderListImage(product)}
            activeVariant={activeVariant}
            onChangeVariant={setActiveVariant}
          />
          <DetailContent
            product={product}
            productImages={renderListImage(product)}
            activeVariant={activeVariant}
            onChangeColor={handleChangeColor}
          />
        </div>
        <div className="blog-content db-desc-wrapper mt-5 md:mt-10 xl:mt-20 pt-10">
          <p className="text-3xl font-bold text-primary mb-2">Mô tả sản phẩm</p>
          {parse(product.product_description)}
        </div>

        <RelatedProduct products={relatedProducts} />
      </div>
    </div>
  );
};

export default DetailProduct;
