import React from "react";

interface INewsTitle {
  text: string;
}

const NewsTitle: React.FC<INewsTitle> = ({ text }) => {
  return (
    <div className="flex items-center gap-5">
      <p className="font-bold text-white text-3xl">{text}</p>
      <div className="flex items-center gap-2 flex-1">
        <div className="w-[9px]  h-[9px] bg-primary rounded-full"></div>
        <div className="two-line"></div>
      </div>
    </div>
  );
};

export default NewsTitle;
