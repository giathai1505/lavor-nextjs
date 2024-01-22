import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { BiCategory } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { IModel } from "@/types/type";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";
import ApiLoading from "@/components/ApiLoading";

interface IDialog {
  open: boolean;
  onClose: () => void;
  onSuccess: (version_id: number, model_id: number) => void;
  listModel: IModel[];
  activeModel: number;
}

interface IAddVersionDialog {
  version_name: string;
  model_id: number;
}

const AddVersionDialog: React.FC<IDialog> = ({
  open,
  onClose,
  onSuccess,
  listModel,
  activeModel,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const { create, loading } = useFetchApi();
  const form = useForm<IAddVersionDialog>({
    defaultValues: {
      model_id: activeModel,
      version_name: "",
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const [models, setModels] = useState<IModel[]>(listModel);

  useEffect(() => {
    setModels(listModel);
  }, [listModel]);

  useEffect(() => {
    setValue("model_id", activeModel);
  }, [activeModel]);

  const invokeAddVersion = async (data: IAddVersionDialog) => {
    try {
      const res: any = await create(
        API_ROUTES.car.addVersion(data.model_id),
        { version_name: data.version_name },
        false
      );

      if (res && res.version_id) {
        onSuccess(res.version_id, activeModel);
        setValue("version_name", "");
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

  const handleOnSuccess = (data: IAddVersionDialog) => {
    invokeAddVersion(data);
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
            <p className="dialog-title">Thêm version</p>
            <AiOutlineClose className="close-icon" onClick={handleOnClose} />
          </div>

          <div className="headless-ui-dialog-body-wrapper ">
            <div className="form-control">
              <div className="form-control-title">
                <span>Model xe</span>
                <div>*</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="form-control-body disable">
                  <BiCategory />
                  <Controller
                    name="model_id"
                    control={control}
                    rules={{ required: "Bạn cần phải nhập trường này!" }}
                    render={({ field }) => (
                      <select {...field}>
                        {Array.isArray(models) &&
                          models.length > 0 &&
                          models.map((item) => {
                            return (
                              <option value={item?.model_id}>
                                {item?.model_name}
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
                <span>Tên version xe</span>
                <div>*</div>
              </div>

              <Controller
                name="version_name"
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
              {errors.version_name && (
                <FormError message={errors.version_name.message} />
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

export default AddVersionDialog;
