import Image from "next/image";
import React from "react";
import userAvatar from "@/assets/images/common/user.png";
import { BsFillStarFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

type IRating = {
  id: number;
  star: number;
  content: string;
  name: string;
  job: string;
};

type IRatingItem = {
  rating: IRating;
  width: number;
};

const RatingItem: React.FC<IRatingItem> = ({ width, rating }) => {
  return (
    <div
      style={{ width: `${width}px` }}
      className="rating-item"
      key={rating.id}
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
                star <= rating.star ? "text-[#FED127]" : ""
              }`}
            />
          );
        })}
      </div>
      <div className="relative flex-1">
        <FaQuoteLeft className="absolute w-10 h-10 text-[#ffffff2b] z-10" />
        <p className="z-20 text-center">{rating.content}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold">
          {rating.name.length > 0 ? rating.name : "Ẩn danh"}
        </p>
        <p className="text-[14px] text-gray italic">
          {rating.job.length > 0 ? rating.job : "Không có"}
        </p>
      </div>
    </div>
  );
};

export default RatingItem;
