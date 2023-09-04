import { unescape } from "querystring";
import React, { useEffect, useRef, useState } from "react";

interface IDropdownOption {
  id: number;
  value: string;
}

interface IDropdown {
  placeHolder: string;
  options: IDropdownOption[];
  onChange: (id: any) => void;
  defaultValue?: IDropdownOption;
  name: string;
}
const Dropdown: React.FC<IDropdown> = ({
  onChange,
  options,
  placeHolder,
  defaultValue,
  name,
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    IDropdownOption | undefined
  >(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue !== undefined) setSelectedOption(defaultValue);
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleChangeOption = (option: IDropdownOption, name: string) => {
    onChange({ [name]: option.id });
    setSelectedOption(option);
    setIsShowDropdown(false);
  };
  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className={`select ${isShowDropdown ? "selected-clicked" : ""}`}
        onClick={() => setIsShowDropdown((pre) => !pre)}
      >
        {selectedOption !== undefined ? (
          <span className="selected">{selectedOption?.value}</span>
        ) : (
          <span className="select-none text-[#9fa5b5]">{placeHolder}</span>
        )}

        <div className={`caret ${isShowDropdown && "caret-rotate"}`}></div>
      </div>
      <ul className={`menu ${isShowDropdown && "menu-open"}`}>
        {options.length > 0 &&
          options.map((item) => {
            return (
              <li
                className={`${item.id === selectedOption?.id && "active"}`}
                onClick={() => handleChangeOption(item, name)}
              >
                {item.value}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Dropdown;
