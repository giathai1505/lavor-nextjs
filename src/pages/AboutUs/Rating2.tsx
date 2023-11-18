"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import user from "@/assets/images/common/user.png";
import { BsFillStarFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { ratings } from "@/data/rating";
import { BiMessageSquare, BiUser } from "react-icons/bi";
import "../Contact/style.css";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import PhongTrungBayImg from "@/assets/images/youtubeThumbnail/aboutUs/phong-trung-bay.webp";
import { MdOutlineWorkOutline } from "react-icons/md";
const gap = 20;

interface IRating {
  visibleItem: number;
}

const Rating2: React.FC<IRating> = ({ visibleItem }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [productItemWidth, setProductItemWidth] = useState<number>(315);
  const [canMoveRight, setCanMoveRight] = useState<boolean>(true);
  const [canMoveLeft, setCanMoveLeft] = useState<boolean>(false);
  const [containerTransformLeft, setContainerTransformLeft] =
    useState<number>(0);

  const [hoverIndex, setHoverIndex] = useState<number>(-1);

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
                  return (
                    <div
                      style={{ width: `${productItemWidth}px` }}
                      className="rating-item"
                      key={item.id}
                    >
                      <div className="bg-white inline-block rounded-full p-1 w-fit">
                        <Image
                          alt="Hình đại diện người dùng"
                          placeholder="blur"
                          src={user}
                          className="w-20 h-20"
                        />
                      </div>

                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          return (
                            <BsFillStarFill
                              className={`w-5 h-5 cursor-pointer relative ${
                                star <= item.star ? "text-[#FED127]" : ""
                              }`}
                            />
                          );
                        })}
                      </div>
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute w-10 h-10 text-[#ffffff2b] z-10" />
                        <p className="z-20 text-center">{item.content}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-bold">
                          {item.name.length > 0 ? item.name : "Ẩn danh"}
                        </p>
                        <p className="text-[14px] text-gray italic">
                          {item.job.length > 0 ? item.job : "Không có"}
                        </p>
                      </div>
                    </div>
                  );
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
            <form action="">
              <div className="flex flex-col gap-5">
                <div className="contact-form-control">
                  <BiUser className="text-white" />
                  <input type="text" placeholder="Tên khách hàng" />
                </div>
                <div className="contact-form-control">
                  <MdOutlineWorkOutline className="text-white" />
                  <input type="text" placeholder="Nghề nghiệp" />
                </div>

                <div className="contact-form-control">
                  <BiMessageSquare className="text-white" />
                  <textarea placeholder="Nội dung đánh giá" />
                </div>
              </div>
              <div className="flex justify-center items-center flex-col gap-10 my-10">
                <div className="flex gap-1 rating-stars">
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                      <BsFillStarFill
                        className={`w-10 h-10 cursor-pointer relative ${
                          item <= hoverIndex ? "text-[#FED127]" : ""
                        }`}
                        onMouseOver={() => setHoverIndex(item)}
                        onMouseLeave={() => setHoverIndex(-1)}
                      />
                    );
                  })}
                </div>

                <button className="primary-button flex justify-center">
                  Hoàn thành
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating2;
