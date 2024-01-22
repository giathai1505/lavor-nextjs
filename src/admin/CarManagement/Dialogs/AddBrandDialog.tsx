import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { AiOutlineClose } from "react-icons/ai";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";
import ApiLoading from "@/components/ApiLoading";

interface IDialog {
  open: boolean;
  onClose: () => void;
  onSuccess: (brand_id: number) => void;
}

interface IAddBrandDialog {
  brand_name: string;
}

const AddBrandDialog: React.FC<IDialog> = ({ open, onClose, onSuccess }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { create, loading } = useFetchApi();
  const form = useForm<IAddBrandDialog>({
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const invokeAddBrand = async (brand_name: string) => {
    try {
      const res: any = await create(
        API_ROUTES.car.addBrand,
        { brand_name: brand_name },
        false
      );
      if (res && res.brand_id) {
        setValue("brand_name", "");
        onSuccess(res.brand_id);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleOnSuccess = (data: IAddBrandDialog) => {
    invokeAddBrand(data.brand_name);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleOnClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <ApiLoading loading={loading} />
      <Dialog.Overlay className="headless-ui-dialog-overlay" />
      <Dialog.Panel className="headless-ui-dialog-content-wrapper">
        <form onSubmit={handleSubmit(handleOnSuccess)}>
          <div className="headless-ui-dialog-header-wrapper">
            <p className="dialog-title">Thêm hãng xe</p>
            <AiOutlineClose className="close-icon" onClick={handleOnClose} />
          </div>
          <input hidden autoFocus={true} />
          <div className="headless-ui-dialog-body-wrapper ">
            <div className="form-control">
              <div className="form-control-title">
                <span>Tên hãng xe</span>
                <div>*</div>
              </div>

              <Controller
                name="brand_name"
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
                    type="text"
                    onBlur={() => {
                      if (!field.value) {
                        field.onChange("");
                      }
                    }}
                    placeholder="Nhập tiêu đề bài viết"
                    className="admin-input"
                    id="text"
                  />
                )}
              />
              {errors.brand_name && (
                <FormError message={errors.brand_name.message} />
              )}
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

export default AddBrandDialog;
