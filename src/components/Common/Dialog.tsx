import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiFillWarning } from "react-icons/ai";

interface IDialog {
  open: boolean;
  onOk: () => void;
  content: string;
  title: string;
  onClose: () => void;
}

const ConfirmDialog: React.FC<IDialog> = ({
  open,
  onOk,
  content,
  title,
  onClose,
}) => {
  let [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOnClose = () => {
    onClose();
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onClose={handleOnClose} className="dialog-wrapper">
        <div className="dialog-warning-line"></div>
        <Dialog.Panel className="flex flex-col gap-4">
          <div className="flex items-center gap-5 px-8 py-8">
            <AiFillWarning className="text-[#ef4444] text-[60px]" />
            <div className="">
              <Dialog.Title className="dialog-title">{title}</Dialog.Title>

              <p className="dialog-content ">{content}</p>
            </div>
          </div>

          <div className="dialog-button-wrapper">
            <button onClick={() => onOk()} className="dialog-button delete">
              Đồng ý
            </button>
            <button onClick={handleOnClose} className="dialog-button cancel ">
              Hủy
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
      <div
        className={`dialog-layer ${isOpen ? "" : "disabled"}`}
        onClick={handleOnClose}
      ></div>
    </>
  );
};
export default ConfirmDialog;
