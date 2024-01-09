"use client";
import { TRating } from "@/types/type";
import React, { useState } from "react";
import RatingItem from "./RatingItem";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const MIN_REVIEW_SHOW: number = 4;

type TRatingListProps = {
  ratings: TRating[];
};

const RatingList: React.FC<TRatingListProps> = ({ ratings }) => {
  if (!ratings) return null;

  const [isShowMore, setisShowMore] = useState<boolean>(false);

  return (
    <div>
      <div>
        {Array.isArray(ratings) &&
          ratings.map((item, index) => {
            if (!isShowMore && index >= MIN_REVIEW_SHOW) return null;
            return <RatingItem rating={item} key={index} />;
          })}
      </div>
      <div
        className="cursor-pointer text-right text-primary italic flex justify-end mt-3"
        onClick={() => setisShowMore((prev) => !prev)}
      >
        {isShowMore ? (
          <p className="flex items-center gap-2">
            <span>Ẩn bớt</span>
            <IoMdArrowDropup />
          </p>
        ) : (
          <p className="flex items-center gap-2">
            <span> Xem thêm</span>
            <IoMdArrowDropdown />
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingList;
