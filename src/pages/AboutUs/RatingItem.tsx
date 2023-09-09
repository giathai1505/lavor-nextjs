import React from "react";
import { AiFillStar } from "react-icons/ai";

const RatingItem = () => {
  return (
    <div className="border border-solid border-white p-2">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <p className="text-end italic">By: Gia Thái</p>
      <div className="flex items-center rating-star gap-1  justify-center">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
      </div>
    </div>
  );
};

export default RatingItem;
