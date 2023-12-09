"use client";
import withAuth from "@/HOC/withAuth";
import RatingTablePage from "@/admin/RatingManagement/RatingTablePage";
import { API_ENPOINT } from "@/constants/api";
import { TRating } from "@/types";
import React, { useEffect, useState } from "react";

async function getAllRatings() {
  const res = await fetch(API_ENPOINT + "review?withDeleted=true", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const RatingAdmin = () => {
  const [ratings, setRatings] = useState<TRating[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRatings();

        if (response?.reviews && Array.isArray(response.reviews)) {
          setRatings(response.reviews);
        } else {
          setRatings([]);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setRatings([]);
      }
    };

    fetchData();
  }, []);

  return <RatingTablePage ratings={ratings} />;
};

export default RatingAdmin;
