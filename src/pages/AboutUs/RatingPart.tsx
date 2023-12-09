"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { BsFillStarFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { ratings } from "@/data/rating";
import "../Contact/style.css";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import PhongTrungBayImg from "@/assets/images/youtubeThumbnail/aboutUs/phong-trung-bay.webp";
import RatingForm from "./Rating/RatingForm";
import RatingItem from "./Rating/RatingItem";
const gap = 20;

interface IRating {
  visibleItem: number;
}

const RatingPart: React.FC<IRating> = ({ visibleItem }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [productItemWidth, setProductItemWidth] = useState<number>(315);
  const [canMoveRight, setCanMoveRight] = useState<boolean>(true);
  const [canMoveLeft, setCanMoveLeft] = useState<boolean>(false);
  const [containerTransformLeft, setContainerTransformLeft] =
    useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      let rect = containerRef.current.getBoundingClientRect();
      let childWidth = (rect.width - (visibleItem - 1) * gap) / visibleItem;
      setProductItemWidth(childWidth);
    }
  }, []);

  const handleMoveSlider = (index: number) => {
    if (index === 1) {
      setCanMoveRight(true);
      if (containerTransformLeft + productItemWidth + gap === 0) {
        setCanMoveLeft(false);
      }
      setContainerTransformLeft((pre) => pre + productItemWidth + gap);
    } else {
      setCanMoveLeft(true);
      const invisibleItem = ratings.length - visibleItem;

      const maxWidth =
        invisibleItem * productItemWidth + (invisibleItem - 1) * gap;

      if (-(maxWidth - productItemWidth) >= containerTransformLeft) {
        setCanMoveRight(false);
      }

      setContainerTransformLeft((pre) => pre - productItemWidth - gap);
    }
  };

  return (
    <div className=" text-white">
      <div className="wrapper">
        <div>
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            Khách hàng nói gì về <span>Lavor</span>?
          </h2>
          <div ref={containerRef} className="relative">
            {canMoveLeft && (
              <AiFillLeftCircle
                className="slider-navigator -left-[25px]"
                onClick={() => handleMoveSlider(1)}
              />
            )}

            {canMoveRight && (
              <AiFillRightCircle
                className="slider-navigator -right-[15px]"
                onClick={() => handleMoveSlider(-1)}
              />
            )}

            <div className="overflow-hidden relative">
              <div
                className={`inline-flex gap-5 relative slide-wrapper`}
                style={{ left: `${containerTransformLeft}px` }}
              >
                {ratings.map((item) => {
                  return <RatingItem rating={item} width={productItemWidth} />;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-10 xl:mt-16">
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            Để lại đánh giá của bạn
          </h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <div>
              <div className="h-[200px] w-[350px] mx-auto mb-5 md:mb-10 md:h-[350px] md:w-[600px] xl:h-[300px] xl:w-[500px]">
                <YoutubeThumbnail
                  imgAlt="Phòng trưng bày Lavor"
                  imgSrc={PhongTrungBayImg}
                  title="ĐỘT NHẬP phòng trưng bày phân xưởng sản xuất nội thất ô tô hàng đầu Việt Nam | Lavor Luxury"
                  link="https://www.youtube.com/watch?v=TusPsCPkLxo"
                />
              </div>
              <div className="text-white text-justify">
                <p>
                  Cùng khám phá phòng trưng bày Lavor để xem những thành tích mà
                  Lavor đã tự hào đạt được.
                </p>
                <br />
                <p>
                  Lavor có được thành tựu như hôm nay là nhờ sự ủng hộ và đóng
                  góp ý kiến của các bạn. Hãy cùng nhau để lại ý kiến để giúp
                  Lavor phát triển hơn nửa nhé
                </p>
              </div>
            </div>
            <RatingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPart;
