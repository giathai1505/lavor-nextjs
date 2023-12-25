import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TDesign } from ".";

export const listMaterials = [
  {
    id: 1,
    name: "Da Lemals",
    popularPercent: 30,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    id: 2,
    name: "Da Estoril",
    popularPercent: 60,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    id: 3,
    name: "Da Napalux",
    popularPercent: 90,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    id: 4,
    name: "Da Milan",
    popularPercent: 100,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
];

const listColors = [
  {
    id: "#F2E3C6",
    color: "#F2E3C6",
  },
  {
    id: "#BA804C",
    color: "#BA804C",
  },
  {
    id: "#C44B3B",
    color: "#C44B3B",
  },
];

const listHolds = [
  {
    id: "#F2E3C6",
    color: "#F2E3C6",
  },
  {
    id: "#BA804C",
    color: "#BA804C",
  },
  {
    id: "#C44B3B",
    color: "#C44B3B",
  },
];

interface IChooseDesign {
  onNext: (data: any) => void;
  onPrevious: () => void;
  data: TDesign;
}

const ChooseDesign: React.FC<IChooseDesign> = ({
  onNext,
  onPrevious,
  data,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<TDesign>(data);

  useEffect(() => {
    setSelectedMaterial(data);
  }, [data]);

  const handleChangeDesign = (value: any) => {
    const newState = { ...selectedMaterial, ...value };
    setSelectedMaterial(newState);
  };

  return (
    <div className="max-w-[1200px] mx-10">
      <div className="border border-solid border-[#ffffff2b] rounded-md p-2 relative mb-10">
        <p className="design-title">Chọn chất liệu da</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {listMaterials.map((item) => {
            return (
              <div
                className={` text-[#595d6e] p-6 relative flex flex-col gap-4 cursor-pointer ${
                  selectedMaterial?.materialID !== item.id
                    ? "border-gray-400"
                    : "border-primary"
                }`}
                onClick={() => handleChangeDesign({ materialID: item.id })}
                key={item.id}
              >
                <div className="flex items-center gap-2">
                  <label htmlFor="" className="">
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedMaterial?.materialID === item.id}
                      className="w-6 h-6"
                    />
                  </label>
                  <h4 className="font-bold">{item.name}</h4>
                </div>

                <p>
                  <span className="font-bold">Độ phổ biến:</span>{" "}
                  {item.popularPercent}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border border-solid border-[#ffffff2b] rounded-md p-10 relative">
        <p className="design-title">Chọn màu sắc</p>
        <div className="mb-5">
          <p className="text-primary font-bold text-base mb-5">Chọn màu sắc</p>
          <div className="flex items-center gap-10">
            {listColors.map((item) => {
              return (
                <div
                  className={`color-pick-item ${
                    selectedMaterial?.colorID === item.id ? "active" : ""
                  }`}
                  onClick={() => handleChangeDesign({ colorID: item.id })}
                  key={item.id}
                >
                  <div
                    className={`w-10 rounded-full h-10 bg-[${item.color}] `}
                    style={{ background: `${item.color}` }}
                  ></div>
                  {selectedMaterial?.colorID === item.id && (
                    <FaCheck className="absolute center-position w-6 h-6 text-white" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-primary font-bold text-base mb-5">
            Chọn thiết kế đục lỗ
          </p>
          <div className="flex items-center gap-10">
            {listColors.map((item) => {
              return (
                <div
                  className={`color-pick-item  ${
                    selectedMaterial?.holeID === item.id ? "active" : ""
                  }`}
                  onClick={() => handleChangeDesign({ holeID: item.id })}
                  key={item.id}
                >
                  <div
                    className={`w-10 rounded-full h-10 bg-[${item.color}] `}
                    style={{ background: `${item.color}` }}
                  ></div>
                  {selectedMaterial?.holeID === item.id && (
                    <FaCheck className="absolute center-position w-6 h-6 text-white" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="design-title">Lưu ý đặc biệt</h3>
        <br />
        <textarea
          name=""
          id=""
          className="border border-solid border-[#ffffff2b]"
          cols={30}
          rows={10}
          placeholder="Lưu ý của bạn ......"
          onChange={(e) => handleChangeDesign({ note: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-5 mt-10">
        <button className="primary-button" onClick={() => onPrevious()}>
          Trở lại
        </button>
        <button
          className={`primary-button ${
            (!selectedMaterial?.colorID ||
              !selectedMaterial?.holeID ||
              !selectedMaterial?.materialID) &&
            "disabled"
          }`}
          onClick={() => onNext(selectedMaterial)}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default ChooseDesign;
