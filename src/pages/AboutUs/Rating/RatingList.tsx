"use client";
import { TRating } from "@/types/type";
import React from "react";
import RatingItem from "./RatingItem";

type TRatingListProps = {
  ratings: TRating[];
};

const RatingList: React.FC<TRatingListProps> = ({ ratings }) => {
  if (!ratings) return null;
  return (
    <div>
      {Array.isArray(ratings) &&
        ratings.map((item, index) => {
          return <RatingItem rating={item} key={index} />;
        })}
    </div>
  );
};

export default RatingList;
