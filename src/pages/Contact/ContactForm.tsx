import React from "react";
import { BiUser, BiMessageSquare } from "react-icons/bi";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import "./style.css";
import Button from "@/components/Common/Button";

const ContactForm = () => {
  return (
    <div>
      <form action="">
        <div className="flex flex-col gap-5">
          <div className="contact-form-control">
            <BiUser className="text-white" />
            <input type="text" placeholder="Tên khách hàng" />
          </div>
          <div className="contact-form-control">
            <AiOutlineMail className="text-white" />
            <input type="text" placeholder="Email" />
          </div>
          <div className="contact-form-control">
            <AiOutlinePhone className="text-white" />
            <input type="text" placeholder="Số điện thoại" />
          </div>
          <div className="contact-form-control">
            <BiMessageSquare className="text-white" />
            <textarea placeholder="Nội dung lưu ý của bạn" />
          </div>
          <div className="fex justify-center">
            <Button
              text="Gửi tin nhắn"
              link="/"
              className="mx-auto flex justify-end"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
