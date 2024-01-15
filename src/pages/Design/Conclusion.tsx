import { sendDesign } from "@/api/ratingAPI";
import { designData, holdPattern } from "@/assets/designData";
import useToast from "@/hooks/useToast";
import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

interface IConclusion {
  onComplete: (data: any) => void;
  onPrevious: () => void;
  designData: any;
}

const getMaterialName = (id: string) => {
  const result = designData.find((item) => item.id === id);
  return result?.name;
};

const getColorName = (leatherType: string, id: number) => {
  const result = designData.find((item) => item.id === leatherType);
  if (result === undefined) return null;
  const color = result.colors.find((item) => item.id === id);
  return color?.name;
};

const getHolePatternName = (id: string) => {
  const result = holdPattern.find((item) => item.id === id);
  return result?.name;
};

const Conclusion: React.FC<IConclusion> = ({
  onComplete,
  designData,
  onPrevious,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { contextHolder, showNotification } = useToast();

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
  };

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
            className="h-[200px] md:h-[300px] rounded-lg object-cover"
          ></img>
        </div>
        <p className="design-conclusion-title">Thiết kế của bạn</p>
        <div className="grid grid-cols-1 gap-10">
          <div className="design-opt ">
            <p>
              - Chất liệu da: {getMaterialName(designData?.design?.materialID)}
            </p>
            <p>
              - Màu da: Mã{" "}
              {getColorName(
                designData?.design?.materialID,
                designData?.design?.colorID
              )}
            </p>
            <p>- Thiết kế đục lỗ: Mã {designData?.design?.holeID}</p>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center">
              <img
                src={`/design/leather-type/${designData?.design?.materialID}/${designData?.design?.colorID}.webp`}
                alt="Hình ảnh màu sắc của da"
                className="w-[200px] h-[100px] md:h-[200px] object-cover rounded-lg mb-5"
              />
              <p className="text-[#595d6e]">
                Màu da: {designData?.design?.colorID}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={`/design/hole-pattern/${designData?.design?.holeID}.webp`}
                alt="Hình ảnh màu sắc của da"
                className="w-[200px] h-[100px] md:h-[200px] object-cover rounded-lg mb-5"
              />

              <p className="text-[#595d6e]">
                Màu da: Mã {designData?.design?.holeID}
              </p>
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
