import { COMMON_COLOR } from "@/constants/constants";
import React from "react";
import { ClipLoader } from "react-spinners";

type TApiLoadingProps = {
  loading: boolean;
};
const ApiLoading = ({ loading }: TApiLoadingProps) => {
  if (!loading) return null;
  return (
    <div className="fixed inset-0 bg-black opacity-70 z-30">
      <ClipLoader
        color={COMMON_COLOR.primary}
        size={50}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ApiLoading;
