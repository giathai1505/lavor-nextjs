"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import map from "@/assets/images/common/agency-map.png";
import ProvinceList from "./ProvinceList";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/5.jpeg";
import { ICity, IRegion } from "@/types/type";

interface IAgencyProps {
  agencies: IRegion[];
}

const Agency: React.FC<IAgencyProps> = ({ agencies }) => {
  const [activeRegion, setActiveRegion] = useState<IRegion | undefined>(
    undefined
  );
  const [listProvinces, setListProvinces] = useState<ICity[]>([]);

  useEffect(() => {
    if (activeRegion && Array.isArray(activeRegion.cities)) {
      setListProvinces(activeRegion.cities);
    } else {
      setListProvinces([]);
    }
  }, [activeRegion]);

  useEffect(() => {
    if (agencies.length > 0) {
      setActiveRegion(agencies[0]);
    }
  }, []);

  return (
    <div>
      <PartHeader
        breadcrumb="Đại lý"
        title="DANH SÁCH ĐẠI LÝ"
        backgroundImage={titleBackgroundImage}
      />
      <div className="wrapper grid grid-cols-1 gap-5 pt-10 p-5 md:p-10 xl:p-16 xl:grid-cols-2 xl:gap-20">
        <div className="col-span-1 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-1 border-r-0 border-solid border-[#80808038] pr-5 h-fit  md:border-r md:col-span-1">
            {Array.isArray(agencies) &&
              agencies.map((item) => {
                return (
                  <p
                    className={`text-white px-5 py-2  mb-2 cursor-pointer rounded ${
                      item.region_id === activeRegion?.region_id
                        ? "bg-primary"
                        : ""
                    }`}
                    onClick={() => setActiveRegion(item)}
                    key={item.region_id}
                  >
                    {item.region_name}
                  </p>
                );
              })}
          </div>
          <div className="col-span-1 md:col-span-2">
            {activeRegion && <ProvinceList provinces={listProvinces} />}
          </div>
        </div>
        <div className="col-span-1">
          <Image
            alt="Đại lý toàn quốc"
            src={map}
            loading="eager"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Agency;
