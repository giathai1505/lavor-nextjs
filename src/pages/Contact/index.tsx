import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/1.webp";

const Contact = () => {
  return (
    <div className="bg-black ">
      <PartHeader
        breadcrumb="Liên hệ"
        title="LIÊN HỆ"
        backgroundImage={titleBackgroundImage}
      />
      <div className="wrapper">
        <div className="p-5 md:p-10 xl:p-16">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
