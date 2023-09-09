import React, { useState } from "react";
import { GoTriangleRight } from "react-icons/go";

interface IProvince {
  id: number;
  name: string;
  regionID: number;
}

interface IProvinceList {
  provinces: IProvince[];
}

const ProvinceList: React.FC<IProvinceList> = ({ provinces }) => {
  const [activeProvince, setActiveProvince] = useState<number>(-1);
  return (
    <div>
      {provinces.length > 0 &&
        provinces.map((item) => {
          return (
            <>
              <div
                className="flex items-center gap-2 bg-gray-400 mb-2 cursor-pointer text-white py-2 pl-5"
                onClick={() => setActiveProvince(item.id)}
              >
                <GoTriangleRight
                  className={` ${
                    activeProvince === item.id ? "rotate-90 text-primary" : ""
                  }`}
                />
                <span
                  className={`${
                    activeProvince === item.id ? "font-bold text-primary" : ""
                  }`}
                >
                  {item?.name}
                </span>
              </div>
              {activeProvince === item.id ? (
                <div>
                  <div className="mb-5">
                    <p className="font-bold text-primary">Chung Auto:</p>
                    <p className="text-white">
                      449/17 Trường Chính Phường 14 quận Tân Bình
                    </p>
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
    </div>
  );
};

export default ProvinceList;
