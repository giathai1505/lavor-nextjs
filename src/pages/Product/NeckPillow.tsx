import Button from "@/components/Common/Button";
import React from "react";
import Image from "next/image";
import { goiCo } from "@/data/products";

const NeckPillow = () => {
  return (
    <div className="py-10">
      <h2 className="mb-3">
        <span>Gối cổ</span>
      </h2>
      <p className="m-0 mb-20 text-base mx-auto text-white text-center max-w-3xl ">
        Thoải mái trên mọi hành trình.<br></br> Tạm biệt nỗi lo đau mỏi cổ, vai,
        gáy.
      </p>
      <div className="grid grid-cols-4 gap-12">
        {goiCo.map((item) => {
          return (
            <div className="border border-solid border-primary" key={item.id}>
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
                        key={color}
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
        <Button link="/" text="Xem thêm"></Button>
      </div>
    </div>
  );
};

export default NeckPillow;
