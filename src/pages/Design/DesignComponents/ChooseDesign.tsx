import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { designData, holdPattern } from "@/assets/designData";
import {
  EDesignPhase,
  TDesign,
  TDesignData,
  TMaterialDesign,
} from "@/types/type";
import Each from "@/lib/Each";
import { useDesignContext } from "../DesignPart";

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
    </div>
  );
};

type ColorItemProps = {
  selectedMaterial: TDesign;
  item: { id: number; name: string };
  onChange: (id: number) => void;
};

const ColorItem = ({ selectedMaterial, item, onChange }: ColorItemProps) => {
  return (
    <div
      className={`color-pick-item`}
      onClick={() => onChange(item.id)}
      key={item.id}
    >
      <img
        src={`/design/leather-type/${selectedMaterial.materialID}/${item.id}.webp`}
        alt="Hình ảnh màu sắc của da"
      />

      {selectedMaterial?.colorID === item.id && (
        <FaCheck className="absolute center-position w-6 h-6 text-white" />
      )}
    </div>
  );
};

type THolePatternItem = {
  selectedMaterial: TDesign;
  item: { id: string; name: string };
  onChange: (id: string) => void;
};

const HolePatternItem = ({
  selectedMaterial,
  item,
  onChange,
}: THolePatternItem) => {
  return (
    <div
      className={`color-pick-item`}
      onClick={() => onChange(item.id)}
      key={item.id}
    >
      <img
        src={`/design/hole-pattern/${item.id}.webp`}
        alt="Hình ảnh màu sắc của da"
      />

      {selectedMaterial?.holeID === item.id && (
        <FaCheck className="absolute center-position w-6 h-6 text-primary" />
      )}
    </div>
  );
};

const ChooseDesign = () => {
  const { data, setData, setPhase } = useDesignContext();
  const [selectedMaterial, setSelectedMaterial] = useState<TDesign>(
    data.design
  );
  const [selectedLeather, setSelectedLeather] = useState<TMaterialDesign>();
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    setSelectedMaterial(data.design);
    const leather = designData.find(
      (item) => item.id === data.design.materialID
    );
    setNote(data.design.note);
    setSelectedLeather(leather);
  }, [data]);

  const handleChangeLeather = (value: TMaterialDesign) => {
    setSelectedLeather(value);
    const newMaterial = { ...selectedMaterial, materialID: value.id };
    setSelectedMaterial(newMaterial);
  };

  const handleChangeColor = (id: number) => {
    const newMaterial = { ...selectedMaterial, colorID: id };
    setSelectedMaterial(newMaterial);
  };

  const handleChangeHolePattern = (id: string) => {
    const newMaterial = { ...selectedMaterial, holeID: id };
    setSelectedMaterial(newMaterial);
  };

  const handleChangeNote = (value: string) => {
    const newMaterial = { ...selectedMaterial, note: value };
    setNote(value);
    setSelectedMaterial(newMaterial);
  };

  const handleMoveNext = () => {
    setPhase(EDesignPhase.CONCLUSION);
    const newData: TDesignData = {
      ...data,
      design: structuredClone(selectedMaterial),
    };
    setData(newData);
  };

  return (
    <div className="max-w-[1200px] mx-5 md:px-10 xl:mx-0">
      <div className="border border-solid border-[#ffffff2b] rounded-md p-2 relative mb-10">
        <p className="design-title">Chọn chất liệu da</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
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
          <div className="flex items-center gap-10 flex-wrap min-h-[130px]">
            {selectedLeather ? (
              <Each
                of={selectedLeather.colors}
                render={(item) => (
                  <ColorItem
                    selectedMaterial={selectedMaterial}
                    item={item}
                    onChange={handleChangeColor}
                  />
                )}
              />
            ) : (
              <div className="italic text-gray-400 select-none">
                (Vui lòng chọn loại da!)
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-primary font-bold text-base mb-5">
            Chọn thiết kế đục lỗ
          </p>
          <div className="flex items-center gap-10 flex-wrap min-h-[130px]">
            <Each
              of={holdPattern}
              render={(item) => (
                <HolePatternItem
                  item={item}
                  selectedMaterial={selectedMaterial}
                  onChange={handleChangeHolePattern}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="design-title">Lưu ý đặc biệt</h3>
        <br />
        <textarea
          className="border border-solid border-[#ffffff2b] p-5"
          cols={30}
          rows={10}
          placeholder="Lưu ý của bạn ......"
          value={note}
          onChange={(e) => handleChangeNote(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-5 mt-10">
        <button
          className="primary-button"
          onClick={() => setPhase(EDesignPhase.CHOOSE_CAR)}
        >
          Trở lại
        </button>
        <button
          className={`primary-button ${
            (!selectedMaterial?.colorID ||
              !selectedMaterial?.holeID ||
              !selectedMaterial?.materialID) &&
            "disabled"
          }`}
          onClick={handleMoveNext}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default ChooseDesign;
