import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo/logo-black.png";
import { BsYoutube } from "react-icons/bs";

interface IYoutubeThumbnail {
  imgSrc: StaticImageData;
  link: string;
  imgAlt: string;
  title: string;
}

const YoutubeThumbnail: React.FC<IYoutubeThumbnail> = ({
  imgSrc,
  link,
  title,
  imgAlt,
}) => {
  return (
    <Link href={link} target="_blank" className="youtubeThumbnail-wrapper">
      <div className="flex relative items-center gap-4 z-20 m-3">
        <Image
          alt={imgAlt}
          src={logo}
          className="w-10 h-10 rounded-full bg-white round-full object-contain"
          placeholder="blur"
        />
        <p className="youtubeThumbnail-title">{title}</p>
      </div>
      <div className="youtubeThumbnail-overlay"></div>
      <BsYoutube className="youtubeThumbnail-icon" />
      <Image
        alt={imgAlt}
        src={imgSrc}
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />
    </Link>
  );
};

export default YoutubeThumbnail;
