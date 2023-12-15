import { addRating } from "@/api/ratingAPI";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiMessageSquare, BiUser } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { CircleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

export type TRatingForm = {
  review_phone: string;
  review_name: string;
  review_content: string;
};

const RatingForm = () => {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [ratingStar, setRatingStar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRatingForm>({
    mode: "all",
  });

  const handleSubmitRating = async (data: TRatingForm) => {
    const apiData = {
      ...data,
      review_rating: ratingStar.toString(),
    };

    try {
      setIsLoading(true);

      const result = await addRating(apiData);

      // if (result) {
      setIsLoading(false);
      //   //show message send notification successfully
      toast.success("Gửi đánh giá thành công! Đánh giá sẽ được phê duyệt !", {
        position: "bottom-center",
        theme: "dark",
      });
      // }
    } catch (error) {
      setIsLoading(false);
      toast.error("Gửi đánh giá thất bại! Vui lòng thử lại sau", {
        position: "bottom-center",
      });
      //show add rating wrong
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(handleSubmitRating)}>
      <div className="flex flex-col gap-5">
        <Controller
          name="review_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="contact-form-control">
              <BiUser className="text-white" />
              <input
                type="text"
                {...field}
                onBlur={() => {
                  if (!field.value) {
                    field.onChange("");
                  }
                }}
                placeholder="Tên khách hàng"
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
                placeholder="Số điện thoại"
                {...field}
                onBlur={() => {
                  if (!field.value) {
                    field.onChange("");
                  }
                }}
              />
            </div>
          )}
        />

        <Controller
          name="review_content"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <div className="contact-form-control">
              <BiMessageSquare className="text-white" />
              <textarea
                placeholder="Nội dung đánh giá"
                {...field}
                onBlur={() => {
                  if (!field.value) {
                    field.onChange("");
                  }
                }}
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
              />
            );
          })}
        </div>

        <button
          className={`primary-button flex justify-center gap-5 ${
            isLoading && "opacity-50"
          }`}
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
      </div>
      <ToastContainer />
    </form>
  );
};

export default RatingForm;
