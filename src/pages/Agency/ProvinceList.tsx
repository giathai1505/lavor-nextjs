"use client";

import { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { IAgency, ICity } from "@/types/type";
import { Empty } from "antd";

interface IProvinceList {
  provinces: ICity[];
}

const ProvinceList: React.FC<IProvinceList> = ({ provinces }) => {
  if (!provinces) return;
  const [activeProvince, setActiveProvince] = useState<number>(NaN);

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
    if (activeProvince === cityID) {
      setActiveProvince(NaN);
    } else {
      setActiveProvince(cityID);
    }
  };

  return (
    <div className="select-none">
      {Array.isArray(provinces) &&
        provinces.length > 0 &&
        provinces.map((item) => {
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
                <span>{item?.city_name}</span>
              </div>
              {activeProvince === item.city_id ? (
                <div>
                  {Array.isArray(listAgency) && listAgency.length > 0 ? (
                    listAgency.map((item) => {
                      return (
                        <div className="mb-5 ml-5" key={item.agency_id}>
                          <p className="font-bold text-primary">
                            {item.agency_name}
                          </p>
                          <p className="text-white">{item.agency_address}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center my-5">
                      <Empty
                        description={
                          <p className="text-primary italic">
                            (Chưa có đại lý nào)
                          </p>
                        }
                        imageStyle={{ opacity: 0.5, width: "80px" }}
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default ProvinceList;
