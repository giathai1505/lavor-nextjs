"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import map from "@/assets/images/map.png";
import { provinces, regions } from "./data";
import ProvinceList from "./ProvinceList";

const Agency = () => {
  const [activeRegion, setActiveRegion] = useState<number | undefined>(
    undefined
  );
  const [listProvinces, setListProvinces] = useState<any>([]);

  useEffect(() => {
    const newList = provinces.filter((item) => {
      return item.regionID === activeRegion;
    });

    setListProvinces(newList);
  }, [activeRegion]);

  return (
    <div className="wrapper grid grid-cols-3 gap-10 pt-40">
      <div className="col-span-2 grid grid-cols-4 gap-4">
        <div className="col-span-1">
          {regions.map((item) => {
            return (
              <p
                className={`text-white px-5 py-2 uppercase mb-2 cursor-pointer rounded ${
                  item.id === activeRegion ? "bg-primary" : "bg-gray-400 "
                }`}
                onClick={() => setActiveRegion(item.id)}
              >
                {item.name}
              </p>
            );
          })}
        </div>
        <div className="col-span-3">
          {activeRegion && <ProvinceList provinces={listProvinces} />}
        </div>
      </div>
      <div>
        <Image alt="Đại lý toàn quốc" src={map} />
      </div>
    </div>
  );
};

export default Agency;
