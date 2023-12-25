import React from "react";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { SocialMediaLink } from "@/assets/staticData";

const followList = [
  {
    id: 1,
    name: "Facebook",
    followers: 5380,
    icon: <FaFacebookF />,
    link: SocialMediaLink.facebook,
  },
  {
    id: 2,
    name: "Tiktok",
    followers: 27000,
    icon: <FaTiktok />,
    link: SocialMediaLink.tiktok,
  },
  {
    id: 3,
    name: "Youtube",
    followers: 126000,
    icon: <FaYoutube />,
    link: SocialMediaLink.youtube,
  },
];

const Followers = () => {
  return (
    <div className="my-10">
      <p className="font-bold text-lg mb-4 text-white">Theo dõi</p>
      <div>
        {followList.map((item) => {
          return (
            <Link
              key={item.id}
              target="_blank"
              href={item.link}
              className="border border-solid border-[#222121] px-3 py-[10px] flex text-[#d7d7d7] hover:text-white hover:bg-[#323232] mb-4"
            >
              <div className="flex items-center gap-5">
                {item.icon}
                <span>|</span>
              </div>

              <p className="flex-1 ml-5">{item.name}</p>
              <div className="flex items-center gap-5">
                <span>|</span>
                <p>{formatCurrencyWithDots(item.followers)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Followers;
