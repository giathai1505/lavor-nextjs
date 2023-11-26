import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { addYear } from "@/api/design";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { constants } from "buffer";

interface IDialog {
  open: boolean;
  onClose: () => void;
  onSuccess: (year: number) => void;
}

interface IAddYearDialog {
  year: number;
}

const AddYearDialog: React.FC<IDialog> = ({ open, onClose, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<IAddYearDialog>({
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const invokeAddYear = async (year: number) => {
    const loadingToastId = toast.info("Đang thêm năm...", {
      position: "top-center",
      autoClose: false,
    });
    addYear(year)
      .then((result) => {
        toast.dismiss(loadingToastId);

        toast.success("Tạo bài viết thành công!!!", {
          position: "top-center",
        });

        onSuccess(year);
        setValue("year", NaN);
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(loadingToastId);
        toast.error("Tạo bài viết thất bại!!!", {
          position: "top-center",
        });
      });
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleOnSuccess = (data: IAddYearDialog) => {
    invokeAddYear(data.year);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleOnClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="headless-ui-dialog-overlay" />
      <Dialog.Panel className="headless-ui-dialog-content-wrapper">
        <form action="" onSubmit={handleSubmit(handleOnSuccess)}>
          <div className="headless-ui-dialog-header-wrapper">
            <p className="dialog-title">Thêm năm</p>
            <AiOutlineClose className="close-icon" onClick={handleOnClose} />
          </div>
          <div className="headless-ui-dialog-body-wrapper ">
            <div className="form-control">
              <div className="form-control-title">
                <span>Tên năm</span>
                <div>*</div>
              </div>

              <Controller
                name="year"
                control={control}
                rules={{
                  required: "Bạn cần phải nhập trường này!",
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    autoFocus={false}
                    placeholder="Nhập tiêu đề bài viết"
                    className="admin-input"
                    id="text"
                  />
                )}
              />
              {errors.year && <FormError message={errors.year.message} />}
            </div>
          </div>

          <div className="headless-ui-dialog-action-button-wrapper">
            <button type="submit" className="admin-button primary">
              Lưu
            </button>
            <button onClick={handleOnClose} className="admin-button basic">
              Hủy
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddYearDialog;
