import React from "react";
import Rating from "./Rating";
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
      <Rating2 />
    </div>
  );
};

export default AboutUs;
