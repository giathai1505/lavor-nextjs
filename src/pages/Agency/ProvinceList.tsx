import { IAgency, ICity } from "@/types";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";

interface IProvinceList {
  provinces: ICity[];
}

const ProvinceList: React.FC<IProvinceList> = ({ provinces }) => {
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
      {Array.isArray(ProvinceList) &&
        provinces.length > 0 &&
        provinces.map((item) => {
          return (
            <>
              <div
                className="flex items-center gap-2 bg-[#4f4f4f] mb-2 cursor-pointer text-white py-2 pl-5"
                onClick={() => toggleActiveProvince(item.city_id)}
                key={item.city_id}
              >
                <GoTriangleRight
                  className={` ${
                    activeProvince === item.city_id
                      ? "rotate-90 text-primary"
                      : ""
                  }`}
                />
                <span
                  className={`${activeProvince === item.city_id ? "" : ""}`}
                >
                  {item?.city_name}
                </span>
              </div>
              {activeProvince === item.city_id ? (
                <div>
                  {listAgency.map((item) => {
                    return (
                      <div className="mb-5">
                        <p className="font-bold text-primary">
                          {item.agency_name}
                        </p>
                        <p className="text-white">{item.agency_address}</p>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          );
        })}
    </div>
  );
};

export default ProvinceList;
