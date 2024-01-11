import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { toast } from "react-toastify";
import { BiCategory } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { IRegion } from "@/types/type";
import useAxiosAuth from "@/hooks/useAxiosAuth";

interface IDialog {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  agencies: IRegion[];
}

interface IAddCityForm {
  region_id: number;
  city_name: string;
}

const AddCityDialog: React.FC<IDialog> = ({
  open,
  onClose,
  onSuccess,
  agencies,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const form = useForm<IAddCityForm>({
    defaultValues: {
      city_name: "",
      region_id: NaN,
    },
    mode: "all",
  });
  const axios = useAxiosAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (agencies.length > 0) {
      setValue("region_id", agencies[0].region_id);
    }
  }, [agencies]);

  const invokeAddCity = async (data: IAddCityForm) => {
    const loadingToastId = toast.info("Đang thêm tỉnh/thành phố ...", {
      position: "top-center",
      autoClose: false,
    });

    try {
      const res = await axios.post(
        `agencies/regions/${data.region_id.toString()}/cities`,
        {
          city_name: data.city_name,
        }
      );

      if (res) {
        toast.dismiss(loadingToastId);

        toast.success("Thêm tỉnh/ thành phố thành công!!!", {
          position: "top-center",
        });
        setValue("city_name", "");

        onSuccess();
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToastId);
      toast.error("Thêm tỉnh/ thành phố thất bại!!!", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOnClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleOnSuccess = (data: IAddCityForm) => {
    invokeAddCity(data);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleOnClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="headless-ui-dialog-overlay" />
      <Dialog.Panel className="headless-ui-dialog-content-wrapper">
        <form onSubmit={handleSubmit(handleOnSuccess)}>
          <div className="headless-ui-dialog-header-wrapper">
            <p className="dialog-title">Thêm Đại lý</p>
            <AiOutlineClose className="close-icon" onClick={handleOnClose} />
          </div>

          <div className="headless-ui-dialog-body-wrapper ">
            <div className="form-control">
              <div className="form-control-title">
                <span>Miền</span>
                <div>*</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="form-control-body">
                  <BiCategory />
                  <Controller
                    name="region_id"
                    control={control}
                    rules={{ required: "Bạn cần phải nhập trường này!" }}
                    render={({ field }) => (
                      <select {...field}>
                        {Array.isArray(agencies) &&
                          agencies.length > 0 &&
                          agencies.map((item) => {
                            return (
                              <option value={item?.region_id}>
                                {item?.region_name}
                              </option>
                            );
                          })}
                      </select>
                    )}
                  />
                </div>
                {errors.region_id && (
                  <FormError message={errors.region_id.message} />
                )}
              </div>
            </div>
            <div className="form-control">
              <div className="form-control-title">
                <span>Tên tỉnh/ thành phố</span>
                <div>*</div>
              </div>

              <Controller
                name="city_name"
                control={control}
                rules={{
                  required: "Bạn cần phải nhập trường này!",
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
                    placeholder="Nhập tên đại lý"
                    className="admin-input"
                    id="text"
                  />
                )}
              />
              {errors.city_name && (
                <FormError message={errors.city_name.message} />
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

export default AddCityDialog;
