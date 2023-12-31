"use client";
import { addRating } from "@/api/ratingAPI";
import { notification } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiMessageSquare, BiUser } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { CircleLoader } from "react-spinners";

export type TRatingForm = {
  review_phone: string;
  review_name: string;
  review_content: string;
};

const RatingForm = () => {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [ratingStar, setRatingStar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const { control, handleSubmit, watch } = useForm<TRatingForm>({
    defaultValues: {
      review_content: "",
      review_name: "",
      review_phone: "",
    },
    mode: "all",
  });

  const contentValue = watch("review_content");

  const openSuccessNotification = () => {
    api["success"]({
      message: "Gửi đánh giá thành công!",
      description:
        "Đánh giá của bạn sẽ được admin phê duyệt trước khi được hiện trên website để tránh nội dung nhạy cảm!",
    });
  };

  const openFailNotification = () => {
    api["error"]({
      message: "Gửi đánh giá thất bại!",
      description: "Lỗi hệ thống! Vui lòng thử lại sau.",
    });
  };

  const handleSubmitRating = async (data: TRatingForm) => {
    const apiData = {
      ...data,
      review_rating: ratingStar.toString(),
    };

    try {
      setIsLoading(true);
      const result = await addRating(apiData);
      setIsLoading(false);
      openSuccessNotification();
    } catch (error) {
      setIsLoading(false);
      openFailNotification();
    }
  };

  return (
    <>
      {contextHolder}
      <form action="" onSubmit={handleSubmit(handleSubmitRating)}>
        <div className="flex flex-col gap-5">
          <Controller
            name="review_name"
            control={control}
            render={({ field }) => (
              <div className="contact-form-control">
                <BiUser className="text-white" />
                <input
                  type="text"
                  {...field}
                  placeholder="Tên khách hàng (không bắt buộc)"
                />
              </div>
            )}
          />

          <Controller
            name="review_phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="contact-form-control">
                <MdOutlineWorkOutline className="text-white" />
                <input
                  type="text"
                  placeholder="Nghề nghiệp (không bắt buộc)"
                  {...field}
                />
              </div>
            )}
          />

          <Controller
            name="review_content"
            control={control}
            render={({ field }) => (
              <div className="contact-form-control">
                <BiMessageSquare className="text-white" />
                <textarea
                  placeholder="Nội dung đánh giá (bắt buộc)"
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-center items-center flex-col gap-10 my-10">
          <div className="flex gap-1 rating-stars">
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <BsFillStarFill
                  className={`w-10 h-10 cursor-pointer relative ${
                    item <= hoverIndex || item <= ratingStar
                      ? "text-[#FED127]"
                      : ""
                  }`}
                  onMouseOver={() => setHoverIndex(item)}
                  onMouseLeave={() => setHoverIndex(-1)}
                  onClick={() => setRatingStar(item)}
                  key={item}
                />
              );
            })}
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <button
              className={`primary-button flex justify-center gap-5 ${
                isLoading && "opacity-50"
              } ${(contentValue === "" || ratingStar === 0) && "disabled"}`}
            >
              {isLoading && (
                <CircleLoader
                  color={"#ffffff"}
                  loading={isLoading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
              Hoàn thành
            </button>
            <p className="italic">
              (Vui lòng nhập nội dung đánh giá và số sao để thực hiện đánh giá)
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default RatingForm;
