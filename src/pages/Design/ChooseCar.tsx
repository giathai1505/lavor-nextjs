import { getCar, getCarByYear } from "@/api/carAPI";
import Dropdown, { IDropdownOption } from "@/components/Common/Dropdown";
import { IBrand, IYear } from "@/types/type";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { TCar } from ".";

interface IChooseCar {
  onNext: (data: any) => void;
  years: IYear[];
  data: TCar;
}

const initListBrands = (brands: IBrand[]) => {
  if (brands.length <= 0) return [];
  return brands.map((item) => {
    return { id: item?.brand_id, value: item?.brand_name };
  });
};

const initListYear = (years: IYear[]) => {
  if (years.length <= 0) return [];

  return years.map((item) => {
    return { id: item?.year, value: item?.year.toString() };
  });
};

const updateListModelWhenChangeBrand = (brandID: number, brands: IBrand[]) => {
  if (!brandID) return [];

  const activeBrand = brands.find((item) => item?.brand_id === brandID);

  if (!activeBrand || activeBrand.models.length === 0) return [];

  return activeBrand?.models.map((item) => {
    return {
      id: item?.model_id,
      value: item?.model_name,
    };
  });
};

const updateListVersionWhenModelChange = (
  brandID: number | undefined,
  modelID: number,
  brands: IBrand[]
) => {
  if (!modelID || !brandID) return [];

  const activeBrand = brands.find((item) => item?.brand_id === brandID);

  if (!activeBrand || activeBrand?.models.length === 0) return [];

  const activeModel = activeBrand?.models.find(
    (item) => item?.model_id === modelID
  );
  if (!activeModel || activeModel?.versions.length === 0) return [];
  return activeModel?.versions.map((item) => {
    return {
      id: item?.version_id,
      value: item?.version_name,
    };
  });
};

const ChooseCar: React.FC<IChooseCar> = ({ onNext, years, data }) => {
  const [carDetail, setCarDetail] = useState<TCar>(data);

  const [listYears, setListYears] = useState<IDropdownOption[]>([]);
  const [listBrands, setListBrands] = useState<IDropdownOption[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [listModels, setListModels] = useState<IDropdownOption[]>([]);
  const [listVersions, setListVersions] = useState<IDropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const invokeGetCar = async (year: number, version: number, value: any) => {
    setIsLoading(true);
    getCar(year, version)
      .then((result) => {
        const newCarDetail: TCar = {
          ...carDetail,
          ...value,
          image: result?.image_url,
        };
        setCarDetail(newCarDetail);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const invokeGetCarByYear = async (year: number) => {
    const result = await getCarByYear(year);
    if (result?.cars) {
      setBrands(result?.cars);
      const brands = initListBrands(result?.cars);
      setListBrands(brands);
    }
  };

  useEffect(() => {
    setListYears(initListYear(years));
    //check if has brand and model the will init the list models and version too
    if (carDetail.brand) {
      setListModels(updateListModelWhenChangeBrand(carDetail.brand.id, brands));

      if (carDetail.model)
        setListVersions(
          updateListVersionWhenModelChange(
            Number(carDetail?.brand?.id),
            carDetail.model.id,
            brands
          )
        );
    }
  }, []);

  useEffect(() => {
    setCarDetail(data);
  }, [data]);

  const handleChangeCarDetail = async (
    value: any,
    type: "year" | "brand" | "model" | "version"
  ) => {
    let newState;
    switch (type) {
      case "year":
        invokeGetCarByYear(value.year.id);

        newState = {
          ...value,
          brand: undefined,
          model: undefined,
          version: undefined,
          image: "",
        };

        break;
      case "brand":
        newState = {
          ...carDetail,
          ...value,
          model: undefined,
          version: undefined,
          image: "",
        };

        setListModels(updateListModelWhenChangeBrand(value?.brand.id, brands));

        break;
      case "model":
        newState = { ...carDetail, ...value, version: undefined, image: "" };

        setListVersions(
          updateListVersionWhenModelChange(
            Number(carDetail?.brand?.id),
            value?.model.id,
            brands
          )
        );
        break;
      case "version":
        newState = { ...carDetail, ...value, image: "" };

        await invokeGetCar(newState?.year?.id, newState?.version?.id, value);

        break;
      default:
        break;
    }

    setCarDetail(newState);
  };

  return (
    <div>
      <div className="max-w-[1200px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mx-10">
        <Dropdown
          name="year"
          options={listYears}
          placeHolder="Năm đời xe"
          value={carDetail?.year}
          onChange={(year) => handleChangeCarDetail(year, "year")}
        />
        {carDetail?.year !== undefined ? (
          <Dropdown
            name="brand"
            options={listBrands}
            placeHolder="Hãng xe"
            value={carDetail?.brand}
            onChange={(brand) => handleChangeCarDetail(brand, "brand")}
          />
        ) : null}

        {carDetail?.brand !== undefined ? (
          <Dropdown
            options={listModels}
            name="model"
            value={carDetail?.model}
            placeHolder="Model xe"
            onChange={(model) => handleChangeCarDetail(model, "model")}
          />
        ) : null}

        {carDetail?.model !== undefined ? (
          <Dropdown
            options={listVersions}
            name="version"
            placeHolder="Version xe"
            value={carDetail?.version}
            onChange={(version) => handleChangeCarDetail(version, "version")}
          />
        ) : null}
      </div>

      <div className="m-10">
        {carDetail?.version !== undefined ? (
          <button className="primary-button" onClick={() => onNext(carDetail)}>
            Tiếp theo
          </button>
        ) : null}
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircleLoader
            color={"#f47a20"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : carDetail?.image !== "" ? (
        <div className="flex justify-center m-10">
          <img src={carDetail?.image} className="w-[500px]" />
        </div>
      ) : null}
    </div>
  );
};

export default ChooseCar;
