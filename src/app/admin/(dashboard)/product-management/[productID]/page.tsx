"use client";
import withAuth from "@/HOC/withAuth";
import ProductForm from "@/admin/ProductManagement/AddNewProduct";
import { API_ENPOINT } from "@/constants/api";
import { IProduct, PStatus, ProductType } from "@/types";
import React, { useEffect, useState } from "react";
const defaultProductValue = {
  product_name: "",
  product_price: 0,
  product_description: "",
  product_feature: "",
  product_detail: [],
  variants: [],
  product_type: ProductType.FLOOR,
  product_meta: "",
  product_status: PStatus.ACTIVE,
  product_images: [],
};

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

const index: React.FC<IPageProps> = ({ params }) => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [defaultValue, setDefaultValue] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductByID(params.productID);

        if (response) {
          const defaultValue = {
            product_name: response.product_name,
            product_price: response.product_price,
            product_description: response.product_description,
            product_feature: response.product_feature,
            product_detail: response.product_detail,
            variants: response.variants,
            product_type: response.product_type ?? ProductType.CHAIR,
            product_meta: response.product_meta,
            product_status: PStatus.ACTIVE,
            product_images: response.product_images,
          };
          setDefaultValue(defaultValue);
        } else {
          setDefaultValue(undefined);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setDefaultValue(undefined);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ProductForm
        isEdit={true}
        productID={params.productID}
        defaultValue={defaultValue ? defaultValue : defaultProductValue}
      />
    </div>
  );
};

export default index;
