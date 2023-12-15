import ProductForm from "@/admin/ProductManagement/AddNewProduct";
import { API_ENPOINT } from "@/constants/api";
import { PStatus, ProductType } from "@/types/type";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sửa thông tin sản phẩm",
  description: "Sửa thông tin sản phẩm",
};

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

const page: React.FC<IPageProps> = async ({ params }) => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }

  const res = await getProductByID(params.productID);

  let defaultValue = undefined;

  if (res) {
    defaultValue = {
      product_name: res.product_name,
      product_price: res.product_price,
      product_description: res.product_description,
      product_feature: res.product_feature,
      product_detail: res.product_detail,
      variants: res.variants,
      product_type: res.product_type ?? ProductType.CHAIR,
      product_meta: res.product_meta,
      product_status: PStatus.ACTIVE,
      product_images: res.product_images,
    };
  }

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

export default page;
