import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { BiCategory } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { IBrand } from "@/types/type";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";
import ApiLoading from "@/components/ApiLoading";

interface IDialog {
  open: boolean;
  onClose: () => void;
  onSuccess: (model_id: number, brand_id: number) => void;
  listBrands: IBrand[];
  activeBrand: number;
}

interface IAddModelDialog {
  model_name: string;
  brand_id: number;
}

const AddModelDialog: React.FC<IDialog> = ({
  open,
  onClose,
  onSuccess,
  listBrands,
  activeBrand,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const { create, loading } = useFetchApi();
  const form = useForm<IAddModelDialog>({
    defaultValues: {
      brand_id: activeBrand,
      model_name: "",
    },
    mode: "all",
  });

  const [brands, setBrands] = useState<IBrand[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    setBrands(listBrands);
  }, [listBrands]);

  useEffect(() => {
    setValue("brand_id", activeBrand);
  }, [activeBrand]);

  const invokeAddBrand = async (data: IAddModelDialog) => {
    try {
      const res: any = await create(
        API_ROUTES.car.addModel(data.brand_id),
        { model_name: data.model_name },
        false
      );
      if (res && res.model_id) {
        setValue("model_name", "");
        onSuccess(res.model_id, activeBrand);
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

  const handleOnSuccess = (data: IAddModelDialog) => {
    invokeAddBrand(data);
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
        <form action="" onSubmit={handleSubmit(handleOnSuccess)}>
          <div className="headless-ui-dialog-header-wrapper">
            <p className="dialog-title">Thêm năm</p>
            <AiOutlineClose className="close-icon" onClick={handleOnClose} />
          </div>

          <div className="headless-ui-dialog-body-wrapper ">
            <div className="form-control">
              <div className="form-control-title">
                <span>Hãng xe</span>
                <div>*</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="form-control-body disable">
                  <BiCategory />
                  <Controller
                    name="brand_id"
                    control={control}
                    rules={{ required: "Bạn cần phải nhập trường này!" }}
                    render={({ field }) => (
                      <select {...field}>
                        {Array.isArray(brands) &&
                          brands.length > 0 &&
                          brands.map((item) => {
                            return (
                              <option value={item?.brand_id}>
                                {item?.brand_name}
                              </option>
                            );
                          })}
                      </select>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="form-control">
              <div className="form-control-title">
                <span>Tên model xe</span>
                <div>*</div>
              </div>

              <Controller
                name="model_name"
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
              {errors.model_name && (
                <FormError message={errors.model_name.message} />
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

export default AddModelDialog;
