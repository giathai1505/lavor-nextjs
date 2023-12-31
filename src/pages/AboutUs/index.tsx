import React from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import PartHeader from "@/components/Common/PartHeader";
import RatingPart from "./RatingPart";
import titleBackgroundImage from "@/assets/images/headerPart/2.jpeg";
import { TRating } from "@/types/type";

type TPageProps = {
  ratings: TRating[];
};

const AboutUs: React.FC<TPageProps> = ({ ratings }) => {
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
      <div className="p-5 md:p-10 xl:p-16 bg-[#000000e8] ">
        <RatingPart ratings={ratings} />
      </div>
    </div>
  );
};

export default AboutUs;
