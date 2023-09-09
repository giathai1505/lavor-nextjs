import React from "react";
import Rating from "./Rating";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";

const AboutUs = () => {
  return (
    <div className="min-h-[1000px]">
      <div className="h-[300px] bg-black"></div>
      <Part1 />
      <Part2 />
      <Part3 />
      <Rating />
    </div>
  );
};

export default AboutUs;
