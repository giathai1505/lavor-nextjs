import Image from "next/image";
import React from "react";
import userAvatar from "@/assets/images/common/user.png";
import { BsFillStarFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { TRating } from "@/types/type";
import Item from "antd/es/list/Item";

type IRatingItem = {
  rating: TRating;
  width: number;
};

const RatingItem: React.FC<IRatingItem> = ({ width, rating }) => {
  return (
    <div
      style={{ width: `${width}px` }}
      className="rating-item"
      key={rating?.review_id}
    >
      <div className="bg-white inline-block rounded-full p-1 w-fit">
        <Image
          alt="Hình đại diện người dùng"
          placeholder="blur"
          src={userAvatar}
          className="w-20 h-20"
        />
      </div>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <BsFillStarFill
              className={`w-5 h-5 cursor-pointer relative ${
                star <= Number(rating?.review_rating) ? "text-[#FED127]" : ""
              }`}
              key={star.toString()}
            />
          );
        })}
      </div>
      <div className="relative flex-1">
        <FaQuoteLeft className="absolute w-10 h-10 text-[#ffffff2b] z-10" />
        <p className="z-20 text-center">{rating?.review_content}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold">
          {rating?.review_name.length > 0 ? rating?.review_name : "Ẩn danh"}
        </p>
        <p className="text-[14px] text-gray italic">
          {rating?.review_phone.length > 0 ? rating?.review_phone : "Không có"}
        </p>
      </div>
    </div>
  );
};

export default RatingItem;
