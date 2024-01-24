"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import map from "@/assets/images/common/agency-map.webp";
import ProvinceList from "./ProvinceList";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/5.webp";
import { ICity, IRegion } from "@/types/type";
import ListRegion from "./RegionList";

interface IAgencyProps {
  agencies: IRegion[];
}

const AgencyPage: React.FC<IAgencyProps> = ({ agencies }) => {
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
          <ListRegion
            activeRegion={activeRegion}
            agencies={agencies}
            setActiveRegion={setActiveRegion}
          />
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

export default AgencyPage;
