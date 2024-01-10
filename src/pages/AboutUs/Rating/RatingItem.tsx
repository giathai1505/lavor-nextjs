import Image from "next/image";
import React from "react";
import userAvatar from "@/assets/images/common/user.png";
import { BsFillStarFill } from "react-icons/bs";
import { TRating } from "@/types/type";
import { indexArray } from "@/utilities/commonUtilities";

type IRatingItem = {
  rating: TRating;
};

type TStar = {
  star: string;
};

const RenderStar: React.FC<TStar> = ({ star }) => {
  const starClassName = (index: number) =>
    `w-5 h-5 cursor-pointer relative ${
      index <= Number(star) && "text-[#ffce3d]"
    }`;

  return (
    <div className="flex gap-1">
      {indexArray(5).map((star) => {
        return (
          <BsFillStarFill
            className={starClassName(star)}
            key={star}
          />
        );
      })}
    </div>
  );
};

const RatingItem: React.FC<IRatingItem> = ({ rating }) => {
  return (
    <div className="rating-item" key={rating?.review_id}>
      <div className="flex-none">
        <Image
          alt="Hình đại diện người dùng"
          placeholder="blur"
          src={userAvatar}
          className="w-10 h-10"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary ">{rating?.review_name}</p>

        <RenderStar star={rating?.review_rating}/>

        <p className="italic text-md text-[#b9b3b3]">{rating?.review_phone}</p>

        <p>{rating?.review_content}</p>
      </div>
    </div>
  );
};

export default RatingItem;
