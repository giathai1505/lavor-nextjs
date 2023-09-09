"use client";
import React, { useState } from "react";
import RatingItem from "./RatingItem";
import { BsFillStarFill } from "react-icons/bs";

const Rating = () => {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  return (
    <div className=" bg-gray-900 py-20 text-white">
      <div className="wrapper">
        <h2 className="mb-10">
          Khách hàng nói gì về <span>Lavor</span>?
        </h2>
        <div className=" h-[600px] border-2 border-solid border-primary pr-2 py-2">
          <div className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-slate-700  h-full p-10 grid grid-cols-3 gap-10 overflow-y-scroll">
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
            <RatingItem />
          </div>
        </div>
        <h2 className="my-5"> Để lại đánh giá của bạn tại đây</h2>
        <div className="rating-form">
          <div className="flex gap-2">
            <span>Tên của bạn:</span>
            <input
              type="text"
              name=""
              id=""
              placeholder="* Không bắt buộc"
              className="bg-transparent outline-none flex-1"
            />
          </div>
          <div className="flex gap-2">
            <span>Số điện thoại của bạn:</span>

            <input
              type="text"
              name=""
              id=""
              placeholder="* Không bắt buộc"
              className="bg-transparent outline-none flex-1"
            />
          </div>
          <div>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="(Để lại những đánh giá của bạn tại đây)"
              className="border-0"
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-5 my-5">
          <div className="flex gap-1 rating-stars">
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <BsFillStarFill
                  className={`w-10 h-10 cursor-pointer relative ${
                    item <= hoverIndex ? "text-[#FED127]" : ""
                  }`}
                  onMouseOver={() => setHoverIndex(item)}
                  onMouseLeave={() => setHoverIndex(-1)}
                />
              );
            })}
          </div>

          <button className="primary-button flex justify-center">
            Hoàn thành{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rating;
