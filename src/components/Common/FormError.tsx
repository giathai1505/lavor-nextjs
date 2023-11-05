import React from "react";
import { BiErrorAlt } from "react-icons/bi";

interface IFormError {
  message: string | undefined;
}

const FormError: React.FC<IFormError> = ({ message }) => {
  return (
    <div className="flex gap-1 items-center text-xs text-[#F93132] mt-2">
      <BiErrorAlt />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
