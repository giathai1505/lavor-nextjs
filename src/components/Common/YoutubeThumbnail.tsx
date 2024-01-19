"use client";
import { StaticImageData } from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo/logo-black.webp";
import { BsYoutube } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

interface IYoutubeThumbnail {
  imgSrc: StaticImageData;
  imgAlt: string;
  title: string;
  embedId: string;
}

const YoutubeThumbnail: React.FC<IYoutubeThumbnail> = ({
  imgSrc,
  embedId,
  title,
  imgAlt,
}) => {
  const [play, setplay] = useState<boolean>(false);
  return (
    <>
      {play ? (
        <div className="youtube-play">
          <div
            className="youtube-play-layer"
            onClick={() => setplay(false)}
          ></div>
          <div
            className="youtube-play-close-icon"
            onClick={() => setplay(false)}
          >
            <MdOutlineClose className="text-white w-8 h-8" />
          </div>
          <div className="youtube-play-video">
            <iframe
              className="w-full h-full absolute"
              src={`https://www.youtube.com/embed/${embedId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      ) : null}

      <div className="youtubeThumbnail-wrapper" onClick={() => setplay(true)}>
        <div className="flex relative items-center gap-4 z-20 m-3">
          <img
            alt={imgAlt}
            src={logo.src}
            className="w-10 h-10 rounded-full bg-white round-full object-contain"
            placeholder="blur"
            loading="lazy"
            width="887"
            height="419"
            decoding="async"
            data-nimg="1"
          />
          <p className="youtubeThumbnail-title">{title}</p>
        </div>
        <div className="youtubeThumbnail-overlay"></div>
        <BsYoutube className="youtubeThumbnail-icon"/>
        <img
          alt={imgAlt}
          src={imgSrc.src}
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          loading="lazy"
          width="336"
          height="188"
          decoding="async"
          data-nimg="1"
        />
      </div>
    </>
  );
};

export default YoutubeThumbnail;
