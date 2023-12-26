"use client";
import React, { useEffect, useRef, useState } from "react";
import "../Contact/style.css";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import PhongTrungBayImg from "@/assets/images/youtubeThumbnail/aboutUs/phong-trung-bay.webp";
import RatingForm from "./Rating/RatingForm";
import RatingItem from "./Rating/RatingItem";
import { TRating } from "@/types/type";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
const GAP = 20;

interface IRating {
  visibleItem: number;
  ratings: TRating[];
}

const RatingPart: React.FC<IRating> = ({ visibleItem, ratings }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [productItemWidth, setProductItemWidth] = useState<number>(315);

  useEffect(() => {
    if (containerRef.current) {
      let rect = containerRef.current.getBoundingClientRect();
      let childWidth = (rect.width - (visibleItem - 1) * GAP) / visibleItem;
      setProductItemWidth(childWidth);
    }
  }, []);

  return (
    <div className=" text-white">
      <div className="wrapper">
        <div>
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            Khách hàng nói gì về <span>Lavor</span>?
          </h2>
        </div>

        <div className="mb-40">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="review-slider"
          >
            {Array.isArray(ratings) &&
              ratings.length > 0 &&
              ratings.map((item) => {
                return (
                  <SwiperSlide key={item.review_id}>
                    <RatingItem rating={item} width={productItemWidth} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
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
