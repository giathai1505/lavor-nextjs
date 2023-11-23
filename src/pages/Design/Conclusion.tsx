import React, { useState } from "react";

interface IConclusion {
  onComplete: (data: any) => void;
}

const Conclusion: React.FC<IConclusion> = ({ onComplete }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  return (
    <div className="border border-solid border-[#595d6e] text-[#595d6e] py-10 px-20">
      <h3 className="text-center font-bold">
        Cùng nhìn lại lựa chọn thiết kế của bạn ngay bây giờ nhé !
      </h3>
      <p className="design-conclusion-title">Chiếc xe của bạn</p>
      <div className="grid grid-cols-2 gap-10">
        <div className="design-opt">
          <p>- Năm đời xe: 2022</p>
          <p>- Hãng xe: Mazda</p>
          <p>- Model xe: CX5</p>
          <p>- Phiên bản: SPORT</p>
        </div>
        <img
          src="https://e7.pngegg.com/pngimages/520/469/png-clipart-2018-mazda-cx-5-2017-mazda-cx-5-mazda-motor-corporation-car-sport-utility-vehicle-car-2018-mazda-cx5-2017-mazda-cx5.png"
          alt="xe của bạn"
          className="h-28"
        ></img>
      </div>
      <p className="design-conclusion-title">Thiết kế của bạn</p>
      <div className="grid grid-cols-3 gap-10">
        <div className="design-opt ">
          <p>- Chất liệu da: Nalpas</p>
          <p>- Màu da: Mã xxx</p>
          <p>- Thiết kế đục lỗ: Mã xxx</p>
        </div>

        <div>
          <img src="" alt="" className="bg-yellow h-20" />
          <p className="text-[#595d6e]">Màu da: Mã xxx</p>
        </div>
        <div>
          <img src="" alt="" className="bg-green h-20" />
          <p className="text-[#595d6e]">Thiết kế đục lỗ: Mã xxx</p>
        </div>
      </div>

      <p className="design-conclusion-title">Lưu ý của bạn</p>
      <div className="design-opt">
        <p>- Tôi muốn abc</p>
        <p>- Tôi cần abc</p>
        <p>...</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 gap-10">
        <h3 className="text-center">
          Hãy để lại số điện thoại của bạn còn lại để Lavor lo
        </h3>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-60 p-1 text-black text-center"
        />
        <button
          className={`primary-button ${phoneNumber !== "" ? "" : "disabled"}`}
          onClick={() => onComplete(phoneNumber)}
        >
          Hoàn thành
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
