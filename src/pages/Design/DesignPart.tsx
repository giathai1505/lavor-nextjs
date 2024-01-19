"use client";
import ProgressBar from "@/components/ProgressBar";
import { EDesignPhase, IYear } from "@/types/type";
import React from "react";
import ChooseCar from "./DesignComponents/ChooseCar";
import dynamic from "next/dynamic";
import DesignContextProvider, {
  useDesignContext,
} from "@/context/DesignContext";

const ChooseDesign = dynamic(() => import("./DesignComponents/ChooseDesign"), {
  loading: () => <p>Loading...</p>,
});

const Conclusion = dynamic(() => import("./DesignComponents/Conclusion"), {
  loading: () => <p>Loading...</p>,
});

type TCurrentPhaseProps = {
  years: IYear[];
};

const CurrentDesignPhase = ({ years }: TCurrentPhaseProps) => {
  const { phase } = useDesignContext();
  const phaseComponents: any = {
    [EDesignPhase.CHOOSE_CAR]: <ChooseCar years={years} />,
    [EDesignPhase.CHOOSE_DESIGN]: <ChooseDesign />,
    [EDesignPhase.CONCLUSION]: <Conclusion />,
  };
  return phaseComponents[phase] || <ChooseCar years={years} />;
};

type TDesignPartProps = {
  years: IYear[];
};

const DesignPart = ({ years }: TDesignPartProps) => {
  return (
    <DesignContextProvider>
      <div className="bg-black pt-20">
        <div className="wrapper">
          <div className="flex justify-center mb-20">
            <ProgressBar />
          </div>
          <div className="pb-10 md:pb-20 xl:pb-40">
            <CurrentDesignPhase years={years} />
          </div>
        </div>
      </div>
    </DesignContextProvider>
  );
};

export default DesignPart;
