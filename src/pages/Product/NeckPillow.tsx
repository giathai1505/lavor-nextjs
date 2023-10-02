import Button from "@/components/Common/Button";
import React from "react";
import { goiCo } from "./data";
import Image from "next/image";

const NeckPillow = () => {
  return (
    <div className="py-10">
      <h2>Goi co</h2>
      <p className="m-0 mb-20 text-xl text-primary text-center">
        Thoải mái trên mọi hành trình.<br></br> Tạm biệt nỗi lo đau mỏi cổ, vai,
        gáy.
      </p>
      <div className="grid grid-cols-4 gap-12">
        {goiCo.map((item) => {
          return (
            <div className="border border-solid border-primary">
              <img
                className="w-full h-[200px] bg-cover"
                alt=""
                src={item.image}
              />
              <div className="text-primary p-4 flex flex-col gap-2">
                <p>Choose color:</p>
                <div className="flex gap-2">
                  {item.color.map((color) => {
                    return (
                      <div
                        className={`bg-[${color}] bg-[#F58220] w-4 h-4 rounded-full cursor-pointer`}
                      ></div>
                    );
                  })}
                </div>
                <p className="font-bold text-base">{item.name}</p>
                <div className="flex gap-2 items-center">
                  <span className="text-2xl font-bold">{item.price}</span>
                  <span className="text-xs">VND</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <Button link="" text="Xem them"></Button>
      </div>
    </div>
  );
};

export default NeckPillow;
