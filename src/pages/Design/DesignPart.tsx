"use client";
import ProgressBar from "@/components/ProgressBar";
import { EDesignPhase, IYear, TDesignData } from "@/types/type";
import React, { createContext, useContext, useMemo, useState } from "react";
import ChooseCar from "./DesignComponents/ChooseCar";
import { DEFAULT_DESIGN_DATA } from "@/constants/constants";
import dynamic from "next/dynamic";

const ChooseDesign = dynamic(() => import("./DesignComponents/ChooseDesign"), {
  loading: () => <p>Loading...</p>,
});

const Conclusion = dynamic(() => import("./DesignComponents/Conclusion"), {
  loading: () => <p>Loading...</p>,
});

type TDesignContextProps = {
  setPhase: (phase: EDesignPhase) => void;
  data: TDesignData;
  setData: (data: TDesignData) => void;
};

const DesignContext = createContext<TDesignContextProps>({
  data: DEFAULT_DESIGN_DATA,
  setData: () => {},
  setPhase: () => {},
});

export const useDesignContext = (): TDesignContextProps => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("useDesignContext must be used within a ThemeProvider");
  }
  return context;
};

type TDesignPartProps = {
  years: IYear[];
};

const DesignPart = ({ years }: TDesignPartProps) => {
  const [phase, setPhase] = useState<EDesignPhase>(EDesignPhase.CHOOSE_CAR);
  const [designData, setDesignData] =
    useState<TDesignData>(DEFAULT_DESIGN_DATA);

  const renderPhase = useMemo(() => {
    const phaseComponents = {
      [EDesignPhase.CHOOSE_CAR]: <ChooseCar years={years} />,
      [EDesignPhase.CHOOSE_DESIGN]: <ChooseDesign />,
      [EDesignPhase.CONCLUSION]: <Conclusion />,
    };
    return phaseComponents[phase] || <ChooseCar years={years} />;
  }, [phase, years]);

  const contextData: TDesignContextProps = {
    setPhase,
    data: designData,
    setData: setDesignData,
  };

  return (
    <DesignContext.Provider value={contextData}>
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
