"use client";
import { TRating } from "@/types/type";
import React, { useState } from "react";
import RatingItem from "./RatingItem";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Each from "@/lib/Each";
import index from "@/app/(user)/dai-ly/page";

const MIN_REVIEW_SHOW: number = 4;

type ShowMoreTextProps = {
  setShowMore: (value: boolean) => void;
  isShowMore: boolean;
};

const ShowMoreText = ({ setShowMore, isShowMore }: ShowMoreTextProps) => {
  const handleShowMore = () => {
    setShowMore(!isShowMore);
  };
  return (
    <div
      className="cursor-pointer text-right text-primary italic flex justify-end mt-3"
      onClick={handleShowMore}
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
  );
};

type TRatingListProps = {
  ratings: TRating[];
};

const RatingList: React.FC<TRatingListProps> = ({ ratings }) => {
  if (!ratings) return null;

  const [isShowMore, setisShowMore] = useState<boolean>(false);

  const listRatingShow = isShowMore
    ? ratings
    : ratings.length > MIN_REVIEW_SHOW
    ? [...ratings].splice(0, MIN_REVIEW_SHOW)
    : ratings;

  return (
    <div>
      <div>
        <Each
          of={listRatingShow}
          render={(item, index) => <RatingItem rating={item} key={index} />}
        />
      </div>
      {ratings.length > MIN_REVIEW_SHOW && (
        <ShowMoreText isShowMore={isShowMore} setShowMore={setisShowMore} />
      )}
    </div>
  );
};

export default RatingList;
