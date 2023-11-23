import ProductForm from "@/admin/ProductManagement/AddNewProduct";
import { API_ENPOINT } from "@/constants/api";
import { PStatus, ProductType } from "@/types";
import React from "react";

interface IPageProps {
  params: { productID: string };
}

async function getProductByID(id: string) {
  const res = await fetch(API_ENPOINT + "products/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const index: React.FC<IPageProps> = async ({ params }) => {
  const product = await getProductByID(params.productID);

  const defaultValue = {
    product_name: product.product_name,
    product_price: product.product_price,
    product_description: product.product_description,
    product_feature: product.product_feature,
    product_detail: product.product_detail,
    variants: product.variants,
    product_type: product.product_type ?? ProductType.CHAIR,
    product_meta: product.product_meta,
    product_status: PStatus.ACTIVE,
    product_images: product.product_images,
  };

  return (
    <div>
      <ProductForm
        isEdit={true}
        productID={params.productID}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default index;
