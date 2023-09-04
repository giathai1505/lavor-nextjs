import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import React, { useState } from "react";

const listCarCompany = [
  {
    id: 1,
    value: "CHEVROLET",
  },
  {
    id: 2,
    value: "FORD",
  },
  {
    id: 3,
    value: "VINFAST",
  },
  {
    id: 4,
    value: "TOYOTA",
  },
];
const listYear = [
  {
    id: 1,
    value: "2020",
  },
  {
    id: 2,
    value: "2021",
  },
  {
    id: 3,
    value: "2022",
  },
  {
    id: 4,
    value: "2023",
  },
];

const listModel = [
  {
    id: 1,
    value: "ENCLAVE",
  },
  {
    id: 2,
    value: "ENCORE",
  },
  {
    id: 3,
    value: "EQUINOX",
  },
  {
    id: 4,
    value: "TRAILBLAZER",
  },
];

interface ICar {
  year: number | undefined;
  company: number | undefined;
  model: number | undefined;
}

interface IChooseCar {
  onNext: () => void;
}

const ChooseCar: React.FC<IChooseCar> = ({ onNext }) => {
  const [carDetail, setCarDetail] = useState<ICar>({
    year: undefined,
    company: undefined,
    model: undefined,
  });

  const handleChangeCarDetail = (
    value: any,
    type: "year" | "company" | "model"
  ) => {
    let newState;
    switch (type) {
      case "year":
        newState = { ...value, company: undefined, model: undefined };
        break;
      case "company":
        newState = { ...carDetail, ...value, model: undefined };
        break;
      case "model":
        newState = { ...carDetail, ...value };
        break;

      default:
        break;
    }

    setCarDetail(newState);
  };

  return (
    <div>
      <div className="max-w-[1200px] grid grid-cols-3 gap-10">
        <Dropdown
          name="year"
          options={listYear}
          placeHolder="Năm đời xe"
          onChange={(year) => handleChangeCarDetail(year, "year")}
        />
        {carDetail.year !== undefined ? (
          <Dropdown
            name="company"
            options={listCarCompany}
            placeHolder="Hãng xe"
            onChange={(company) => handleChangeCarDetail(company, "company")}
          />
        ) : null}

        {carDetail.company !== undefined ? (
          <Dropdown
            options={listModel}
            name="model"
            placeHolder="Model xe"
            onChange={(model) => handleChangeCarDetail(model, "model")}
          />
        ) : null}
      </div>
      <div className="ml-8">
        {carDetail.model !== undefined ? (
          <button className="primary-button" onClick={() => onNext()}>
            Tiếp theo
          </button>
        ) : null}
      </div>
      <div></div>
    </div>
  );
};

export default ChooseCar;
