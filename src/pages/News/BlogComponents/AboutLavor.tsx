import Image from "next/image";
import React from "react";
import Logo from "@/assets/images/logo/logo-white.png";

const AboutLavor = () => {
  return (
    <div className="text-white">
      <p className="font-bold text-lg  text-white mb-4">Về Lavor</p>
      <div className="p-5 mb-10 border border-solid border-[#8080805e] flex flex-col gap-5 items-center">
        <div>
          <Image alt="" src={Logo} width={100}></Image>
        </div>
        <p className="font-medium uppercase">Công Ty TNHH Nội thất Lavor</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
    </div>
  );
};

export default AboutLavor;
