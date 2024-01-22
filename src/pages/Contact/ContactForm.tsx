"use client";
import React, { useState } from "react";
import { BiUser, BiMessageSquare } from "react-icons/bi";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { Controller, useForm } from "react-hook-form";
import { CircleLoader } from "react-spinners";
import useToast from "@/hooks/useToast";
import axios from "@/lib/axios";
import API_ROUTES from "@/constants/apiRoutes";

export type TContactForm = {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_content: string;
};

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, watch } = useForm<TContactForm>({
    defaultValues: {
      contact_content: "",
      contact_email: "",
      contact_name: "",
      contact_phone: "",
    },
    mode: "all",
  });
  const { contextHolder, showNotification } = useToast();

  const contactName = watch("contact_name");
  const contactPhone = watch("contact_phone");
  const contactContent = watch("contact_content");

  const handleSubmitRating = async (data: TContactForm) => {
    try {
      setIsLoading(true);
      await axios.post(API_ROUTES.email.sendContact, data)
      setIsLoading(false);
      showNotification(
        "success",
        "Gửi liên hệ thành công!",
        "Ý kiến của bạn sẽ được Admin xem xét và phản hồi cho bạn sớm nhất có thể. Cảm ơn bạn đã quan tâm tới Lavor!"
      );
    } catch (error) {
      setIsLoading(false);
      showNotification(
        "error",
        "Gửi đánh giá thất bại!",
        "Lỗi hệ thống! Vui lòng thử lại sau."
      );
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <form onSubmit={handleSubmit(handleSubmitRating)}>
          <div className="flex flex-col gap-5">
            <Controller
              name="contact_name"
              control={control}
              render={({ field }) => (
                <div className="contact-form-control">
                  <BiUser className="text-white" />
                  <input
                    type="text"
                    {...field}
                    placeholder="Tên khách hàng (bắt buộc)"
                  />
                </div>
              )}
            />

            <Controller
              name="contact_email"
              control={control}
              render={({ field }) => (
                <div className="contact-form-control">
                  <AiOutlineMail className="text-white" />
                  <input type="text" {...field} placeholder="Email" />
                </div>
              )}
            />

            <Controller
              name="contact_phone"
              control={control}
              render={({ field }) => (
                <div className="contact-form-control">
                  <AiOutlinePhone className="text-white" />
                  <input
                    type="text"
                    {...field}
                    placeholder="Số điện thoại (bắt buộc)"
                  />
                </div>
              )}
            />

            <Controller
              name="contact_content"
              control={control}
              render={({ field }) => (
                <div className="contact-form-control">
                  <BiMessageSquare className="text-white" />
                  <textarea
                    {...field}
                    placeholder="Nội dung lưu ý của bạn (bắt buộc)"
                  />
                </div>
              )}
            />

            <div className="flex flex-col gap-5 items-end">
              <p className="italic text-white">
                (Vui lòng nhập tên, số điện thoại và ý kiến của bạn!)
              </p>
              <button
                className={`primary-button flex justify-center gap-5 w-fit ${
                  isLoading && "opacity-50"
                } ${
                  (contactContent === "" ||
                    contactName === "" ||
                    contactPhone === "") &&
                  "disabled"
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
                Gửi liên hệ
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
