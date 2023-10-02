import React from "react";
import NewsTitle from "./NewsTitle";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
const followList = [
  {
    id: 1,
    name: "Facebook",
    followers: 100,
    icon: <FaFacebookF />,
  },
  {
    id: 1,
    name: "Tiktok",
    followers: 100,
    icon: <FaTiktok />,
  },
  {
    id: 1,
    name: "Youtube",
    followers: 100,
    icon: <FaYoutube />,
  },
];

const RecruitmentNews = () => {
  return (
    <div className="my-10">
      <NewsTitle text="Theo dõi" />
      <div className="mt-10">
        {followList.map((item) => {
          return (
            <Link
              href=""
              className="border border-solid border-[#222121] px-3 py-[10px] flex text-[#d7d7d7] hover:text-white hover:bg-[#323232] mb-4"
            >
              <div className="flex items-center gap-5">
                {item.icon}
                <span>|</span>
              </div>

              <p className="flex-1 ml-5">{item.name}</p>
              <div className="flex items-center gap-5">
                <span>|</span>
                <p>{item.followers}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecruitmentNews;
