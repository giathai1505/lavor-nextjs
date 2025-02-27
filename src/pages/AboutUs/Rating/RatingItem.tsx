import Image from "next/image";
import React from "react";
import userAvatar from "@/assets/images/common/user.webp";
import { BsFillStarFill } from "react-icons/bs";
import { TRating } from "@/types/type";
import { indexArray } from "@/utilities/commonUtilities";
import Each from "@/lib/Each";


type TStar = {
  star: string;
};

export const RenderStar: React.FC<TStar> = ({ star }) => {
  const starClassName = (index: number) =>
    `rating-form-star ${index <= Number(star) && "active-star"}`;

  return (
    <div className="flex gap-1">
      <Each
        of={indexArray(5)}
        render={(star) => <BsFillStarFill className={starClassName(star)} />}
      />
    </div>
  );
};


type IRatingItem = {
  rating: TRating;
};

const RatingItem: React.FC<IRatingItem> = ({ rating }) => {
  if(!rating) return null
  return (
    <div className="rating-item" key={rating.review_id}>
      <div className="flex-none">
        <Image
          alt="Hình đại diện người dùng"
          placeholder="blur"
          src={userAvatar}
          className="w-10 h-10"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary ">{rating.review_name}</p>
        <RenderStar star={rating.review_rating} />
        <p className="italic text-md text-[#b9b3b3]">{rating.review_phone}</p>
        <p>{rating.review_content}</p>
      </div>
    </div>
  );
};

export default RatingItem;
