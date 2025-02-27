import Dropdown, { IDropdownOption } from "@/components/Common/Dropdown";
import API_ROUTES from "@/constants/apiRoutes";
import { useDesignContext } from "@/context/DesignContext";
import axios from "@/lib/axios";
import { EDesignPhase, IBrand, IYear, TCar, TDesignData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

interface IChooseCar {
  years: IYear[];
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

const ChooseCar: React.FC<IChooseCar> = ({ years }) => {
  const { data, setPhase, setData } = useDesignContext();

  const [carDetail, setCarDetail] = useState<TCar>(data.car);
  const [listYears, setListYears] = useState<IDropdownOption[]>([]);
  const [listBrands, setListBrands] = useState<IDropdownOption[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [listModels, setListModels] = useState<IDropdownOption[]>([]);
  const [listVersions, setListVersions] = useState<IDropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const invokeGetCar = async (year: number, version: number, value: any) => {
    setIsLoading(true);

    let image = ""

    try {
      const res: any = await axios.get(API_ROUTES.car.getCar(year, version));

      if (res && res.data && res.data.image_url) {
        image =  res.data.image_url
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      return image
    } catch (error) {
      setIsLoading(false);
      return image
    }
  };

  const invokeGetCarByYear = async (year: number) => {
    try {
      const res: any = await axios.get(API_ROUTES.car.getCarsByYear(year));

      if (res && res.data && res.data.cars) {
        setBrands(res.data.cars);
        const brands = initListBrands(res.data.cars);
        setListBrands(brands);
        return res.cars;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    setListYears(initListYear(years));

    if (carDetail?.year?.id) {
      Promise.resolve(invokeGetCarByYear(carDetail.year.id)).then((item) => {
        if (carDetail.brand) {
          setListModels(
            updateListModelWhenChangeBrand(carDetail?.brand.id, item)
          );
          if (carDetail.model)
            setListVersions(
              updateListVersionWhenModelChange(
                Number(carDetail?.brand?.id),
                carDetail?.model.id,
                item
              )
            );
        }
      });
    }

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
    setCarDetail(data.car);
  }, [data]);



  const handleChangeCarDetail = async (
    value: any,
    type: "year" | "brand" | "model" | "version"
  ) => {
    let newState;
    switch (type) {
      case "year":
        await invokeGetCarByYear(value.year.id);

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

        const image = await invokeGetCar(carDetail?.year?.id, value?.version?.id, value);

        newState = { ...carDetail, ...value, image: image};

        break;
      default:
        break;
    }

    setCarDetail(newState);
  };

  const handleMoveNext = () => {
    setPhase(EDesignPhase.CHOOSE_DESIGN);
    const newData: TDesignData = {
      ...data,
      car: structuredClone(carDetail),
    };

    setData(newData);
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
        {carDetail?.year?.id ? (
          <Dropdown
            name="brand"
            options={listBrands}
            placeHolder="Hãng xe"
            value={carDetail?.brand}
            onChange={(brand) => handleChangeCarDetail(brand, "brand")}
          />
        ) : null}

        {carDetail?.brand?.id ? (
          <Dropdown
            options={listModels}
            name="model"
            value={carDetail?.model}
            placeHolder="Model xe"
            onChange={(model) => handleChangeCarDetail(model, "model")}
          />
        ) : null}

        {carDetail?.model?.id ? (
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
        {carDetail?.version?.id ? (
          <button className="primary-button" onClick={handleMoveNext}>
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
