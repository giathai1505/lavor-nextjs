import React from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import PartHeader from "@/components/Common/PartHeader";
import Rating2 from "./Rating2";
import titleBackgroundImage from "@/assets/images/headerPart/2.jpeg";

const AboutUs = () => {
  return (
    <div className="min-h-[1000px]">
      <PartHeader
        breadcrumb="Về chúng tôi"
        title="VỀ CHÚNG TÔI"
        backgroundImage={titleBackgroundImage}
      />
      <Part1 />
      <Part2 />
      <Part3 />
      <div className="p-5 md:p-10 xl:p-16 bg-[#000000e8] hidden xl:block">
        <Rating2 visibleItem={4} />
      </div>
      <div className="p-5 md:p-10 xl:p-16 bg-[#000000e8] hidden md:block xl:hidden ">
        <Rating2 visibleItem={2} />
      </div>
      <div className="p-5 md:p-10 xl:p-16 bg-[#000000e8] md:hidden">
        <Rating2 visibleItem={1} />
      </div>
    </div>
  );
};

export default AboutUs;
