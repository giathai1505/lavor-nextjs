import Dropdown from "@/components/Common/Dropdown";
import React, { useState } from "react";

const listMaterials = [
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
    id: 1,
    color: "#F2E3C6",
  },
  {
    id: 2,
    color: "#BA804C",
  },
  {
    id: 3,
    color: "#C44B3B",
  },
];

const listHolds = [
  {
    id: 1,
    color: "#F2E3C6",
  },
  {
    id: 2,
    color: "#BA804C",
  },
  {
    id: 3,
    color: "#C44B3B",
  },
];

interface IDesign {
  materialID: number | undefined;
  colorID: number | undefined;
  holeID: number | undefined;
  note: string;
}

interface IChooseDesign {
  onNext: () => void;
  onPrevious: () => void;
}

const ChooseDesign: React.FC<IChooseDesign> = ({ onNext, onPrevious }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<IDesign>({
    materialID: undefined,
    colorID: undefined,
    holeID: undefined,
    note: "",
  });

  const handleChangeDesign = (value: any) => {
    let newState = { ...selectedMaterial, ...value };
    setSelectedMaterial(newState);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div>
        <h3 className="design-title">Chọn chất liệu da</h3>
        <br />
        <div className="grid grid-cols-4 gap-10">
          {listMaterials.map((item) => {
            return (
              <div
                className={`border-[1px] border-solid text-white p-6 relative flex flex-col gap-4 cursor-pointer ${
                  selectedMaterial.materialID !== item.id
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
                      name=""
                      checked={selectedMaterial.materialID === item.id}
                      id=""
                      className="w-6 h-6"
                    />
                  </label>
                  <h4 className="font-bold">{item.name}</h4>
                </div>

                <p>
                  <span className="font-bold">Độ phổ biến:</span>{" "}
                  {item.popularPercent}%
                </p>
                <p className="text-justify">
                  {" "}
                  <span className="font-bold"> Đặc điểm:</span> <br />
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="design-title">Chọn màu da</h3>
        <br />
        <div className="grid grid-cols-3 gap-10">
          {listColors.map((item) => {
            return (
              <div
                className={`border-[1px] border-solid  text-white relative flex flex-col  gap-4 cursor-pointer ${
                  selectedMaterial.colorID !== item.id
                    ? "border-0"
                    : "border-primary"
                }`}
                onClick={() => handleChangeDesign({ colorID: item.id })}
                key={item.id}
              >
                <label htmlFor="" className="absolute top-5 left-5">
                  <input
                    type="checkbox"
                    name=""
                    checked={selectedMaterial.colorID === item.id}
                    id=""
                    className="w-6 h-6"
                  />
                </label>
                <div>
                  <div
                    className={`w-full h-[200px] bg-[${item.color}] `}
                    style={{ background: `${item.color}` }}
                  ></div>
                  <p className="text-white text-center py-2">
                    <span>Mã màu: </span>
                    {item.id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="design-title">CHỌN THIẾT KẾ ĐỤC LỖ</h3>
        <br />
        <div className="grid grid-cols-3 gap-10">
          {listHolds.map((item) => {
            return (
              <div
                className={`border-[1px] border-solid  text-white relative flex flex-col  gap-4 cursor-pointer ${
                  selectedMaterial.holeID !== item.id
                    ? "border-0"
                    : "border-primary"
                }`}
                onClick={() => handleChangeDesign({ holeID: item.id })}
                key={item.id}
              >
                <label htmlFor="" className="absolute top-5 left-5">
                  <input
                    type="checkbox"
                    name=""
                    checked={selectedMaterial.holeID === item.id}
                    id=""
                    className="w-6 h-6"
                  />
                </label>
                <div>
                  <div
                    className={`w-full h-[200px] bg-[${item.color}] `}
                    style={{ background: `${item.color}` }}
                  ></div>
                  <p className="text-white text-center py-2">
                    <span>Mã màu: </span>
                    {item.id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="design-title">Lưu ý đặc biệt</h3>
        <br />
        <textarea
          name=""
          id=""
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
        <button className="primary-button" onClick={() => onNext()}>
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default ChooseDesign;
