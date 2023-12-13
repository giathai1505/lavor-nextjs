import { API_ENPOINT } from "@/constants/api";
import React from "react";

interface IPageProps {
  params: { carID: string };
}

async function getBlogByID(id: string) {
  const res = await fetch(API_ENPOINT + "blogs/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const index: React.FC<IPageProps> = async ({ params }) => {
  const blog = await getBlogByID(params.carID);

  const defaultValue = {
    year: 0,
    brand_id: NaN,
    model_id: NaN,
    version_id: NaN,
    image_url: "",
  };

  return (
    <div>
      edit car page
      {/* <CarManagementForm
        isEdit={true}
        defaultValue={defaultValue}
        blogID={params.carID}
      /> */}
    </div>
  );
};

export default index;
