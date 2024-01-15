import { sendDesign } from "@/api/ratingAPI";
import useToast from "@/hooks/useToast";
import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

interface IConclusion {
  onComplete: (data: any) => void;
  onPrevious: () => void;
  designData: any;
}

const getMaterialName = (id: number) => {
  const result = {name: "Thai"}

  return result?.name;
};

const Conclusion: React.FC<IConclusion> = ({
  onComplete,
  designData,
  onPrevious,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {contextHolder, showNotification} = useToast()

  const handleSenDesign = async () => {
    try {
      setIsLoading(true);
      const result = await sendDesign(designData);
      setIsLoading(false);
      showNotification(
        "success",
        "Gửi liên hệ thành công!",
        "Ý kiến của bạn sẽ được Admin xem xét và phản hồi cho bạn sớm nhất có thể. Cảm ơn bạn đã quan tâm tới Lavor!"
      );
    } catch (error) {
      setIsLoading(false);
      showNotification(
        "error",
        "Gửi đánh giá thất bại!",
        "Lỗi hệ thống! Vui lòng thử lại sau."
      );
    }
  }

  return (
    <>
{contextHolder}
    <div className="border border-solid border-[#595d6e] text-[#595d6e] p-5 m-5 md:p-10 md:m-0 xl:p-20">
      <h3 className="text-center font-bold">
        Cùng nhìn lại lựa chọn thiết kế của bạn ngay bây giờ nhé !
      </h3>
      <p className="design-conclusion-title">Chiếc xe của bạn</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="design-opt">
          <p>- Năm đời xe: {designData?.car?.year?.value}</p>
          <p>- Hãng xe: {designData?.car?.brand?.value}</p>
          <p>- Model xe: {designData?.car?.model?.value}</p>
          <p>- Phiên bản: {designData?.car?.version?.value}</p>
        </div>
        <img
          src={designData?.car?.image}
          alt="xe của bạn"
          className="h-28"
        ></img>
      </div>
      <p className="design-conclusion-title">Thiết kế của bạn</p>
      <div className="grid grid-cols-1 gap-10">
        <div className="design-opt ">
          <p>
            - Chất liệu da: {getMaterialName(designData?.design?.materialID)}
          </p>
          <p>- Màu da: Mã {designData?.design?.colorID}</p>
          <p>- Thiết kế đục lỗ: Mã {designData?.design?.holeID}</p>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center">
            <div
              style={{ background: `${designData?.design?.colorID}` }}
              className="w-20 h-20 rounded-md mb-2"
            ></div>
            <p className="text-[#595d6e]">Màu da: Mã xxx</p>
          </div>
          <div className="flex flex-col items-center">
            <div
              style={{ background: `${designData?.design?.holeID}` }}
              className="w-20 h-20 rounded-md mb-2"
            ></div>
            <p className="text-[#595d6e]">Màu da: Mã xxx</p>
          </div>
        </div>
      </div>

      <p className="design-conclusion-title">Lưu ý của bạn</p>
      <div className="design-opt">
        <p>{designData?.design?.note}</p>
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
        <div className="flex justify-end gap-5">
          <button className="primary-button" onClick={() => onPrevious()}>
            Trở lại
          </button>

          <button
            className={`primary-button flex justify-center gap-5 w-fit ${
              isLoading && "opacity-50 disabled"
            }  ${phoneNumber !== "" ? "" : "disabled"}`}
            onClick={() => handleSenDesign()}
          >
            {isLoading && (
              <CircleLoader
                color={"#ffffff"}
                loading={isLoading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            Gửi liên hệ
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Conclusion;
