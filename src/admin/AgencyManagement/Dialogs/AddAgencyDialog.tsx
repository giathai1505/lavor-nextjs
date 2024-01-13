import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { BiCategory } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { IAgency, ICity } from "@/types/type";
import Each from "@/lib/Each";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";

interface IDialog {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cities: ICity[];
}

interface IAddAgencyForm {
  city_id: number;
  agency_name: string;
  agency_address: string;
}

const AddAgencyDialog: React.FC<IDialog> = ({
  open,
  onClose,
  onSuccess,
  cities,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const form = useForm<IAddAgencyForm>({
    defaultValues: {
      agency_address: "",
      city_id: NaN,
      agency_name: "",
    },
    mode: "all",
  });

  const [listCity, setListCity] = useState<ICity[]>([]);

  const { create } = useFetchApi();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (cities.length > 0) {
      setListCity(cities);
      setValue("city_id", cities[0]?.city_id);
    }
  }, [cities]);

  const invokeAddAgency = async (data: IAddAgencyForm) => {
    const newData: IAgency = {
      agency_address: data.agency_address,
      agency_name: data.agency_name,
      agency_id: 0,
    };

    try {
      const res = await create(
        API_ROUTES.agency.addAgency(data.city_id),
        {
          agencies: [newData],
        },
        false
      );

      if (res) {
        setValue("agency_address", "");
        setValue("agency_name", "");
        setIsOpen(false);
        onSuccess();
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

  const handleOnSuccess = (data: IAddAgencyForm) => {
    invokeAddAgency(data);
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
                <span>Tỉnh</span>
                <div>*</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="form-control-body">
                  <BiCategory />
                  <Controller
                    name="city_id"
                    control={control}
                    rules={{ required: "Bạn cần phải nhập trường này!" }}
                    render={({ field }) => (
                      <select {...field}>
                        <Each
                          of={listCity}
                          render={(item, _) => (
                            <option value={item?.city_id}>
                              {item?.city_name}
                            </option>
                          )}
                        />
                      </select>
                    )}
                  />
                </div>
                {errors.city_id && (
                  <FormError message={errors.city_id.message} />
                )}
              </div>
            </div>
            <div className="form-control">
              <div className="form-control-title">
                <span>Tên đại lý</span>
                <div>*</div>
              </div>

              <Controller
                name="agency_name"
                control={control}
                rules={{
                  required: "Bạn cần phải nhập trường này!",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Nhập tên đại lý"
                    className="admin-input"
                    id="text"
                  />
                )}
              />
              {errors.agency_name && (
                <FormError message={errors.agency_name.message} />
              )}
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Địa chỉ</span>
                <div>*</div>
              </div>

              <Controller
                name="agency_address"
                control={control}
                rules={{
                  required: "Bạn cần phải nhập trường này!",
                }}
                render={({ field }) => (
                  <textarea
                    className="text-[13px]"
                    {...field}
                    rows={4}
                    placeholder="Nhập địa chỉ"
                  />
                )}
              />
              {errors.agency_name && (
                <FormError message={errors.agency_name.message} />
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

export default AddAgencyDialog;
