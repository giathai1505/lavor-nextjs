import React from "react";
import NewsTitle from "./NewsTitle";
import { newestNews } from "./data";
import { neww, renderCategory } from "./Newest";
import { AiOutlineCalendar } from "react-icons/ai";

interface ISpotlightItem {
  newContent: neww;
}
const NewsItem: React.FC<ISpotlightItem> = ({ newContent }) => {
  return (
    <div className="flex ">
      <div className="h-[180px] overflow-hidden">
        <img src={newContent.image} className="object-cover" />
      </div>
      <div className="flex-2 flex flex-col gap-3 mx-5 my-auto">
        {renderCategory(newContent.category)}
        <p className="text-base text-white">{newContent.title}</p>
        <div className="flex items-center gap-2 text-[#a5a6aa]">
          <AiOutlineCalendar />
          <p>{newContent.dated}</p>
        </div>
      </div>
    </div>
  );
};

const SpotlightNews = () => {
  return (
    <div className="py-10">
      <NewsTitle text="Tin hot" />
      <div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="h-[330px]">
            <img
              src={newestNews[0].image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="my-auto ml-10 mt-5">
            {renderCategory(newestNews[0].category)}
            <p className="text-[22px] text-white my-5">{newestNews[0].title}</p>
            <p className="common-text mb-5">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old
            </p>
            <div className="flex items-center gap-2 text-[#a5a6aa]">
              <AiOutlineCalendar />
              <p>{newestNews[0].dated}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
          {newestNews.map((item, index) => {
            return <NewsItem newContent={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SpotlightNews;
