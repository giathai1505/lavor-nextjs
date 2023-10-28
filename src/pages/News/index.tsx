import PartHeader from "@/components/Common/PartHeader";
import React from "react";
import Newest from "./Newest";
import SpotlightNews from "./SpotlightNews";
import FavoriteNews from "./FavoriteNews";
import RecruitmentNews from "./RecruitmentNews";
const titleBackgroundImage =
  "https://images.pexels.com/photos/132657/pexels-photo-132657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const News = () => {
  return (
    <div>
      <PartHeader
        breadcrumb="Tin tức"
        title="Tin tức"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black">
        <div className="wrapper pt-20">
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <Newest />
              <div className="h-[200px]">
                <img
                  src="https://images.pexels.com/photos/804128/pexels-photo-804128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <SpotlightNews />
            </div>
            <div>
              <FavoriteNews />
              <RecruitmentNews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
