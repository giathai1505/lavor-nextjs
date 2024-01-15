import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TDesign } from ".";
import { designData, holdPattern } from "@/assets/designData";
import { TMaterialDesign } from "@/types/type";
import Each from "@/lib/Each";


type TLeatherTypeItemProps = {
  selectedItem: TMaterialDesign | undefined;
  item: TMaterialDesign;
  onChange: (value: TMaterialDesign) => void;
};

const LeatherTypeItem = ({
  onChange,
  selectedItem,
  item,
}: TLeatherTypeItemProps) => {
  return (
    <div
      className={` text-[#595d6e] p-6 relative flex flex-col gap-4 cursor-pointer ${
        selectedItem?.id !== item.id ? "border-gray-400" : "border-primary"
      }`}
      onClick={() => onChange(item)}
      key={item.id}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="" className="">
          <input
            type="checkbox"
            readOnly
            checked={selectedItem?.id === item.id}
            className="w-6 h-6"
          />
        </label>
        <h4 className="font-bold">{item.name}</h4>
      </div>
      <p>
        <span className="font-bold">Độ phổ biến:</span> {40}%
      </p>
    </div>
  );
};

type ColorItemProps = {
  selectedMaterial: TDesign;
  item: { id: number; name: string };
};

const ColorItem = ({ selectedMaterial, item }: ColorItemProps) => {
  return (
    <div
      className={`color-pick-item ${
        selectedMaterial?.colorID === item.id.toString() ? "active" : ""
      }`}
      onClick={() => {}}
      key={item.id}
    >
      <div className={`w-10 rounded-full h-10  `}></div>
      {selectedMaterial?.colorID === item.id.toString() && (
        <FaCheck className="absolute center-position w-6 h-6 text-white" />
      )}
    </div>
  );
};




type THolePatternItem = {
  selectedMaterial: TDesign;
  item: { id: string; name: string };
};

const HolePatternItem = ({ selectedMaterial, item }: THolePatternItem) => {
  return (
    <div
    className={`color-pick-item  ${
      selectedMaterial?.holeID === item.id ? "active" : ""
    }`}
    onClick={()=> {}}
    key={item.id}
  >
    <div
      className={`w-10 rounded-full h-10  `}

    ></div>
    {selectedMaterial?.holeID === item.id && (
      <FaCheck className="absolute center-position w-6 h-6 text-white" />
    )}
  </div>
  );
};


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
  const [selectedLeather, setSelectedLeather] = useState<TMaterialDesign>();

  useEffect(() => {
    setSelectedMaterial(data);
  }, [data]);

  const handleChangeLeather = (value: TMaterialDesign) => {
    setSelectedLeather(value);
    const newMaterial = { ...selectedMaterial, materialID: value.id };
    setSelectedMaterial(newMaterial);
  };

  const handleChangeColor = () => {};

  const handleChangeNote = (note: string) => {
    const newMaterial = { ...selectedMaterial, note:  note };
    setSelectedMaterial(newMaterial);
  }



  return (
    <div className="max-w-[1200px] mx-10">
      <div className="border border-solid border-[#ffffff2b] rounded-md p-2 relative mb-10">
        <p className="design-title">Chọn chất liệu da</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Each
            of={designData}
            render={(item) => (
              <LeatherTypeItem
                item={item}
                onChange={handleChangeLeather}
                selectedItem={selectedLeather}
              />
            )}
          />
        </div>
      </div>
      <div className="border border-solid border-[#ffffff2b] rounded-md p-10 relative">
        <p className="design-title">Chọn màu sắc</p>
        <div className="mb-5">
          <p className="text-primary font-bold text-base mb-5">Chọn màu sắc</p>
          <div className="flex items-center gap-10">
            {selectedLeather && (
              <Each
                of={selectedLeather.colors}
                render={(item) => <ColorItem selectedMaterial={selectedMaterial}  item={item}/>}
              />
            )}
          </div>
        </div>
        <div>
          <p className="text-primary font-bold text-base mb-5">
            Chọn thiết kế đục lỗ
          </p>
          <div className="flex items-center gap-10">
          <Each of={holdPattern} render={(item)=> <HolePatternItem item={item} selectedMaterial={selectedMaterial}/>}/>
          </div>
        </div>
      </div>

      <div>
        <h3 className="design-title">Lưu ý đặc biệt</h3>
        <br />
        <textarea
          className="border border-solid border-[#ffffff2b]"
          cols={30}
          rows={10}
          placeholder="Lưu ý của bạn ......"
          onChange={(e) => handleChangeNote(e.target.value )}
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
