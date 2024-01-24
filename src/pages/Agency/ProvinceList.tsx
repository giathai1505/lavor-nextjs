"use client";
import { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { IAgency, ICity } from "@/types/type";
import ListAgency from "./AgencyList";

type TProvinceList = {
  provinces: ICity[];
};

const ProvinceList = ({ provinces }: TProvinceList) => {
  const [activeProvince, setActiveProvince] = useState<number | null>(null);
  const [listAgency, setListAgency] = useState<IAgency[]>([]);

  useEffect(() => {
    const newAgencies = provinces.find(
      (item) => item.city_id === activeProvince
    );

    if (newAgencies && Array.isArray(newAgencies.agencies)) {
      setListAgency(newAgencies.agencies);
    }
  }, [activeProvince]);

  const toggleActiveProvince = (cityID: number) => {
    setActiveProvince((prev) => (prev === cityID ? null : cityID));
  };

  if (!provinces) return null;

  return (
    <div className="select-none">
      {provinces.map((item) => {
        return (
          <div key={item.city_id}>
            <div
              className="flex items-center gap-2 bg-[#4f4f4f] mb-2 cursor-pointer text-white py-2 pl-5"
              onClick={() => toggleActiveProvince(item.city_id)}
            >
              <GoTriangleRight
                className={` ${
                  activeProvince === item.city_id
                    ? "rotate-90 text-primary"
                    : ""
                }`}
              />
              <span>{item.city_name}</span>
            </div>
            {activeProvince === item.city_id ? (
              <ListAgency agencies={listAgency} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default ProvinceList;
