import { SERVER_API_ENPOINT } from "@/constants/server.env";
import AboutUs from "@/pages/AboutUs/AboutUsPage";
import { TRating } from "@/types/type";
import { Metadata } from "next";
import React from "react";

async function getAllRatings() {
  try {
    const res = await fetch(SERVER_API_ENPOINT + "review", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Với Lavor, nội thất xe của bạn sẽ trở nên đẳng cấp hơn",
};

const index = async () => {
  let ratings: TRating[] = [];

  try {
    const response = await getAllRatings();
    if (response?.reviews && Array.isArray(response.reviews)) {
      ratings = response.reviews;
    } else {
      ratings = [];
    }
  } catch (error) {
    ratings = [];
  }

  return <AboutUs ratings={ratings} />;
};

export default index;
