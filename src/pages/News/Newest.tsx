import React from "react";
import NewsTitle from "./NewsTitle";
import { AiOutlineCalendar } from "react-icons/ai";
import { newestNews } from "@/data/news";

export interface neww {
  id: number;
  category: number;
  title: string;
  dated: string;
  image: string;
}

interface INewsItem {
  newContent: neww;
}
export const renderCategory = (id: number) => {
  let component = null;
  const className = "py-[6px] px-2 rounded-sm text-white w-fit text-xs";
  switch (id) {
    case 1:
      component = (
        <div className={`${className} bg-[#ff3385]`}>Kiến thức & mẹo</div>
      );
      break;
    case 2:
      component = <div className={`${className} bg-[#0073ff]`}>Về Lavor</div>;
      break;
    case 3:
      component = <div className={`${className} bg-[#ffae25]`}>Tuyền dụng</div>;
      break;

    default:
      component = (
        <div className={`${className} bg-[#ff3385]`}>Kiến thức & mẹo</div>
      );
      break;
  }
  return component;
};

const NewsItem: React.FC<INewsItem> = ({ newContent }) => {
  return (
    <div className="flex border border-solid border-[#222121]">
      <div className="flex-2 flex flex-col gap-3 mx-5 my-auto">
        {renderCategory(newContent.category)}
        <p className="text-base text-white">{newContent.title}</p>
        <div className="flex items-center gap-2 text-[#a5a6aa]">
          <AiOutlineCalendar />
          <p>{newContent.dated}</p>
        </div>
      </div>
      <div className="h-[180px] overflow-hidden">
        <img src={newContent.image} className="object-cover" />
      </div>
    </div>
  );
};

const Newest = () => {
  return (
    <div>
      <NewsTitle text="Tin mới" />
      <div className="grid grid-cols-2 gap-5 py-10">
        <div className="border border-solid border-[#222121]">
          <div className="h-[300px]">
            <img
              src={newestNews[0].image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="my-auto ml-10 mt-5">
            {renderCategory(newestNews[0].category)}
            <p className="text-[22px] text-white my-5">{newestNews[0].title}</p>
            <div className="flex items-center gap-2 text-[#a5a6aa]">
              <AiOutlineCalendar />
              <p>{newestNews[0].dated}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {newestNews.map((item, index) => {
            if (index > 0) return <NewsItem newContent={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Newest;
