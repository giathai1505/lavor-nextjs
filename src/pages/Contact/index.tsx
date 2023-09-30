import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import PartHeader from "@/components/Common/PartHeader";
const titleBackgroundImage =
  "https://images.pexels.com/photos/100655/pexels-photo-100655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Contact = () => {
  return (
    <div>
      <div className="bg-black ">
        <PartHeader title="LIÊN HỆ" backgroundImage={titleBackgroundImage} />
        <div className="wrapper">
          <div className="pb-40 pt-10">
            <div className="grid grid-cols-2 gap-10">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
