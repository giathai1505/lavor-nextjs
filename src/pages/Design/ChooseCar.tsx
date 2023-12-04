import Dropdown, { IDropdownOption } from "@/components/Common/Dropdown";
import { IBrand, IModel, IYear } from "@/types";
import React, { useEffect, useState } from "react";

interface ICar {
  year: any;
  brand: any;
  model: any;
  version: any;
}

interface IChooseCar {
  onNext: (data: any) => void;
  years: IYear[];
  brands: IBrand[];
}

const initListBrands = (brands: IBrand[]) => {
  if (brands.length <= 0) return [];
  return brands.map((item) => {
    return { id: item.brand_id, value: item.brand_name };
  });
};

const initListYear = (years: IYear[]) => {
  if (years.length <= 0) return [];

  return years.map((item) => {
    return { id: item.year, value: item.year.toString() };
  });
};

const updateListModelWhenChangeBrand = (brandID: number, brands: IBrand[]) => {
  if (!brandID) return [];

  const activeBrand = brands.find((item) => item.brand_id === brandID);

  if (!activeBrand || activeBrand.models.length === 0) return [];

  return activeBrand.models.map((item) => {
    return {
      id: item.model_id,
      value: item.model_name,
    };
  });
};

const updateListVersionWhenModelChange = (
  brandID: number | undefined,
  modelID: number,

  brands: IBrand[]
) => {
  if (!modelID || !brandID) return [];

  const activeBrand = brands.find((item) => item.brand_id === brandID);

  if (!activeBrand || activeBrand.models.length === 0) return [];

  const activeModel = activeBrand.models.find(
    (item) => item.model_id === modelID
  );
  if (!activeModel || activeModel.versions.length === 0) return [];
  return activeModel.versions.map((item) => {
    return {
      id: item.version_id,
      value: item.version_name,
    };
  });
};

const ChooseCar: React.FC<IChooseCar> = ({ onNext, years, brands }) => {
  const [carDetail, setCarDetail] = useState<ICar>({
    year: undefined,
    brand: undefined,
    model: undefined,
    version: undefined,
  });

  const [listYears, setListYears] = useState<IDropdownOption[]>([]);
  const [listBrands, setListBrands] = useState<IDropdownOption[]>([]);
  const [listModels, setListModels] = useState<IDropdownOption[]>([]);
  const [listVersions, setListVersions] = useState<IDropdownOption[]>([]);
  useEffect(() => {
    setListBrands(initListBrands(brands));
    setListYears(initListYear(years));
  }, []);

  const handleChangeCarDetail = (
    value: any,
    type: "year" | "brand" | "model" | "version"
  ) => {
    let newState;
    switch (type) {
      case "year":
        newState = {
          ...value,
          brand: undefined,
          model: undefined,
          version: undefined,
        };
        break;
      case "brand":
        newState = { ...carDetail, ...value, model: undefined };
        setListModels(updateListModelWhenChangeBrand(value.brand.id, brands));

        break;
      case "model":
        newState = { ...carDetail, ...value, version: undefined };
        setListVersions(
          updateListVersionWhenModelChange(
            Number(carDetail.brand?.id),
            value.model.id,
            brands
          )
        );
        break;
      case "version":
        newState = { ...carDetail, ...value };
        break;
      default:
        break;
    }

    setCarDetail(newState);
  };

  return (
    <div>
      <div className="max-w-[1200px] grid grid-cols-4 gap-10">
        <Dropdown
          name="year"
          options={listYears}
          placeHolder="Năm đời xe"
          onChange={(year) => handleChangeCarDetail(year, "year")}
        />
        {carDetail.year !== undefined ? (
          <Dropdown
            name="brand"
            options={listBrands}
            placeHolder="Hãng xe"
            onChange={(brand) => handleChangeCarDetail(brand, "brand")}
          />
        ) : null}

        {carDetail.brand !== undefined ? (
          <Dropdown
            options={listModels}
            name="model"
            placeHolder="Model xe"
            onChange={(model) => handleChangeCarDetail(model, "model")}
          />
        ) : null}

        {carDetail.model !== undefined ? (
          <Dropdown
            options={listVersions}
            name="version"
            placeHolder="Version xe"
            onChange={(version) => handleChangeCarDetail(version, "version")}
          />
        ) : null}
      </div>
      <div className="ml-8">
        {carDetail.version !== undefined ? (
          <button className="primary-button" onClick={() => onNext(carDetail)}>
            Tiếp theo
          </button>
        ) : null}
      </div>
      <div></div>
    </div>
  );
};

export default ChooseCar;
