import ProgressBar from "@/components/ProgressBar";
import { EDesignPhase, IYear } from "@/types/type";
import React, { createContext, useMemo, useState } from "react";
import ChooseCar from "./ChooseCar";
import ChooseDesign from "./ChooseDesign";
import Conclusion from "./Conclusion";

export const DesignContext = createContext({});

type TDesignData = {
  car: TCar;
  design: TDesign;
  phoneNumber: string;
};

type TOption = {
  id: number;
  value: string;
};

export type TCar = {
  year: TOption | undefined;
  brand: TOption | undefined;
  model: TOption | undefined;
  version: TOption | undefined;
  image: string;
};

export type TDesign = {
  materialID: string | undefined;
  colorID: number | undefined;
  holeID: string | undefined;
  note: string;
};

type TDesignPart = {
  years: IYear[];
};

const DesignPart = ({ years }: TDesignPart) => {
  const [phase, setPhase] = useState<EDesignPhase>(EDesignPhase.CHOOSE_CAR);
  const [designData, setDesignData] = useState<TDesignData>({
    car: {
      brand: undefined,
      model: undefined,
      version: undefined,
      year: undefined,
      image: "",
    },
    design: {
      materialID: undefined,
      colorID: undefined,
      holeID: undefined,
      note: "",
    },
    phoneNumber: "",
  });

  const handleDesignDataChange = (phase: EDesignPhase, data: any) => {
    let newData;
    switch (phase) {
      case EDesignPhase.CHOOSE_CAR:
        newData = {
          ...designData,
          car: structuredClone(data),
        };
        setPhase(EDesignPhase.CHOOSE_DESIGN);

        break;
      case EDesignPhase.CHOOSE_DESIGN:
        newData = {
          ...designData,
          design: structuredClone(data),
        };
        setPhase(EDesignPhase.CONCLUSION);

        break;
      case EDesignPhase.CONCLUSION:
        newData = {
          ...designData,
          phoneNumber: structuredClone(data),
        };

        //handle send right here

        break;
      default:
        break;
    }

    setDesignData(newData as TDesignData);
  };

  const renderPhase = useMemo(() => {
    let phaseComponent;
    switch (phase) {
      case EDesignPhase.CHOOSE_CAR:
        phaseComponent = (
          <ChooseCar
            onNext={(data: any) =>
              handleDesignDataChange(EDesignPhase.CHOOSE_CAR, data)
            }
            years={years}
            data={designData.car}
          />
        );

        break;
      case EDesignPhase.CHOOSE_DESIGN:
        phaseComponent = (
          <ChooseDesign
            onNext={(data: any) =>
              handleDesignDataChange(EDesignPhase.CHOOSE_DESIGN, data)
            }
            data={designData.design}
            onPrevious={() => setPhase(EDesignPhase.CHOOSE_CAR)}
          />
        );

        break;
      case EDesignPhase.CONCLUSION:
        phaseComponent = (
          <Conclusion
            onPrevious={() => setPhase(EDesignPhase.CHOOSE_DESIGN)}
            onComplete={(data: any) =>
              handleDesignDataChange(EDesignPhase.CONCLUSION, data)
            }
            designData={designData}
          />
        );

        break;

      default:
        phaseComponent = (
          <ChooseCar
            years={years}
            onNext={(data: any) => handleDesignDataChange(1, data)}
            data={designData.car}
          />
        );
        break;
    }
    return phaseComponent;
  }, [phase, years]);

  
  return (
    <DesignContext.Provider value={{ phase, designData }}>
      <div className="bg-black pt-20">
        <div className="wrapper">
          <div className="flex justify-center mb-20">
            <ProgressBar active={phase} />
          </div>
          <div className="pb-10 md:pb-20 xl:pb-40">{renderPhase}</div>
        </div>
      </div>
    </DesignContext.Provider>
  );
};

export default DesignPart;
