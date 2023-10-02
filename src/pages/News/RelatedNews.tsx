import React from "react";
import NewsTitle from "./NewsTitle";
import { renderCategory } from "./Newest";
import { AiOutlineCalendar } from "react-icons/ai";
import { newestNews } from "./data";
export interface neww {
  id: number;
  category: number;
  title: string;
  dated: string;
  image: string;
}

interface IPageProps {
  newContent: neww;
}

const NewsItem: React.FC<IPageProps> = ({ newContent }) => {
  return (
    <div className="flex border border-solid border-[#222121]">
      <div className="h-[60px] w-[60px] my-auto flex-none overflow-hidden ml-3">
        <img
          src={newContent.image}
          className="object-cover h-full w-full rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3 mx-5 my-2">
        <p className="text-base text-white">{newContent.title}</p>
        <div className="flex items-center gap-2 text-xs text-[#a5a6aa]">
          <AiOutlineCalendar />
          <p>{newContent.dated}</p>
        </div>
      </div>
    </div>
  );
};

const RelatedNews = () => {
  return (
    <div className="my-10">
      <NewsTitle text="Tin lien quan" />
      <div className="my-10">
        {newestNews.map((item, index) => {
          if (index > 0) return <NewsItem newContent={item} />;
        })}
      </div>
    </div>
  );
};

export default RelatedNews;
