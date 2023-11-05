import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

interface IOption {
  key: number;
  value: string;
}

//fist option is default value
interface INoneFormSelectCustomProps {
  options: IOption[];
  onChange: (item: IOption) => void;
  className?: string;
  placeholder?: string;
}

const NoneFormSelectCustom: React.FC<INoneFormSelectCustomProps> = ({
  options,
  onChange,
  className,
  placeholder = "filter",
}) => {
  const [selectedOption, setSelectedOption] = useState<IOption | undefined>();
  const [isShowOption, setIsShowOption] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowOption(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleOnchange = (item: IOption) => {
    setSelectedOption(item);
    onChange(item);
    setIsShowOption(false);
  };
  return (
    <div className={`custom-select-wrapper ${className}`} ref={wrapperRef}>
      <div
        className="custom-select-wrapper-show "
        onClick={() => setIsShowOption((prev) => !prev)}
      >
        {selectedOption ? (
          <span className="selected">{selectedOption.value}</span>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}

        <AiOutlineCaretDown />
      </div>
      <div
        className={`custom-select-wrapper-option ${isShowOption ? "show" : ""}`}
      >
        {options.map((item) => {
          return (
            <p
              onClick={() => handleOnchange(item)}
              className={`${
                selectedOption?.key === item.key ? "selected" : ""
              } `}
              key={item.key}
            >
              {item.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default NoneFormSelectCustom;
