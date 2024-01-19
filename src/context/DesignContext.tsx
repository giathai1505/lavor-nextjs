import { DEFAULT_DESIGN_DATA } from "@/constants/constants";
import { EDesignPhase, TDesignData } from "@/types/type";
import React, { ReactNode, createContext, useContext, useState } from "react";

const CONTEXT_ERR_MESSAGE = "useDesignContext must be used within a ThemeProvider"

export type TDesignContextProps = {
  phase: EDesignPhase;
  data: TDesignData;
  setPhase: React.Dispatch<React.SetStateAction<EDesignPhase>>;
  setData: React.Dispatch<React.SetStateAction<TDesignData>>;
};

const DesignContext = createContext<TDesignContextProps>({
  phase: EDesignPhase.CHOOSE_CAR,
  data: DEFAULT_DESIGN_DATA,
  setData: () => {},
  setPhase: () => {},
});

export const useDesignContext = (): TDesignContextProps => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error(CONTEXT_ERR_MESSAGE);
  }
  return context;
};

type TDesignContextProvider = {
  children: ReactNode;
};

const DesignContextProvider = ({ children }: TDesignContextProvider) => {
  const [phase, setPhase] = useState<EDesignPhase>(EDesignPhase.CHOOSE_CAR);
  const [designData, setDesignData] =
    useState<TDesignData>(DEFAULT_DESIGN_DATA);

  const contextData: TDesignContextProps = {
    phase,
    setPhase,
    data: designData,
    setData: setDesignData,
  };

  return (
    <DesignContext.Provider value={contextData}>
      {children}
    </DesignContext.Provider>
  );
};

export default DesignContextProvider;
