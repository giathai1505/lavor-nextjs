import { SocialMediaLink } from "@/assets/staticData";
import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";

const TIP_CONTENT = {
  messenger: "Chat với chúng tôi qua Messenger",
  phone: "Hotline: 1900 234 556",
};

const LiveChatIcon = () => {
  return (
    <div className="fixed bottom-10 p-2 rounded-tl-lg rounded-bl-lg right-5 flex flex-col gap-5 z-[9999999]">
      <Tooltip placement="left" title={TIP_CONTENT.messenger}>
        <Link href={SocialMediaLink.messenger} className="media-ring-icon">
          <RiMessengerFill className="w-8 h-8 z-10" />
        </Link>
      </Tooltip>

      <Tooltip placement="left" title={TIP_CONTENT.phone}>
        <Link href={SocialMediaLink.phone} className="media-ring-icon">
          <FaPhoneAlt className="w-7 h-7 z-10" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default LiveChatIcon;
