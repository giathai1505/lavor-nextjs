import React from "react";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { SocialMediaLink } from "@/assets/staticData";
import Each from "@/lib/Each";

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

const renderFollowItem = (follow: any) => {
  return (
    <Link
      key={follow.id}
      target="_blank"
      href={follow.link}
      className="border border-solid border-[#222121] px-3 py-[10px] flex text-[#d7d7d7] hover:text-white hover:bg-[#323232] mb-4"
    >
      <div className="flex items-center gap-5">
        {follow.icon}
        <span>|</span>
      </div>

      <p className="flex-1 ml-5">{follow.name}</p>
      <div className="flex items-center gap-5">
        <span>|</span>
        <p>{formatCurrencyWithDots(follow.followers)}</p>
      </div>
    </Link>
  );
};

const Followers = () => {
  return (
    <div className="my-10">
      <p className="font-bold text-lg mb-4 text-white">Theo dõi</p>
      <div>
        <Each of={followList} render={(item) => renderFollowItem(item)} />
      </div>
    </div>
  );
};

export default Followers;
