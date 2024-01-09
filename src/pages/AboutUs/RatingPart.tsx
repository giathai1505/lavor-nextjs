import React from "react";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import PhongTrungBayImg from "@/assets/images/youtubeThumbnail/aboutUs/phong-trung-bay.webp";
import RatingForm from "./Rating/RatingForm";
import { TRating } from "@/types/type";
import RatingList from "./Rating/RatingList";
import "../Contact/style.css";

interface IRating {
  ratings: TRating[];
}

const RatingPart: React.FC<IRating> = ({ ratings }) => {
  return (
    <div className=" text-white">
      <div className="wrapper">
        <div>
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            Khách hàng nói gì về <span>Lavor</span>?
          </h2>
        </div>

        <div className="mb-40">
          <RatingList ratings={ratings} />
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
                  embedId="TusPsCPkLxo?si=ivvu5xs7fp73IPm3"
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
                  Lavor phát triển hơn nữa nhé!
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
