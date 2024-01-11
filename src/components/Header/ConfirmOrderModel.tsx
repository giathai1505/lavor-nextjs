import React from "react";
import { Button, Modal, notification } from "antd";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { RenderCartItem, getTotalBill } from "./Cart";
import { Controller, useForm } from "react-hook-form";
import FormError from "../Common/FormError";
import { IProduct } from "@/types/type";

type IOrderContact = {
  contact_name: string;
  contact_phone: string;
  contact_email: string;
};

type TProps = {
  isShow: boolean;
  setShow: (status: boolean) => void;
  carts: IProduct[];
  setCarts: (carts: IProduct[]) => void;
};

const ConfirmOrderModel: React.FC<TProps> = ({
  carts,
  isShow,
  setCarts,
  setShow,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Đơn hàng thành công!",
      description:
        "Đơn hàng đã được gửi đến bộ phận quản lý. Sẽ có nhân viên liên hệ và hỗ trợ quý khách. Cảm ơn quý khách đã tin tưởng và ủng hộ Lavor!",
    });
  };

  const form = useForm<IOrderContact>({
    defaultValues: {
      contact_email: "",
      contact_name: "",
      contact_phone: "",
    },
    mode: "all",
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = form;

  const handleOrderSuccess = () => {
    setShow(false);
    // setOpen(false);
    openNotificationWithIcon();

    //reset form value
    reset({
      contact_email: "",
      contact_name: "",
      contact_phone: "",
    });

    //clear cart
    localStorage.setItem("carts", JSON.stringify([]));
    setCarts([]);
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Xác nhận đơn hàng"
        open={isShow}
        onCancel={() => setShow(false)}
        footer={[
          <Button key="back" onClick={() => setShow(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="text-white bg-primary hover:bg-primary"
            disabled={!isDirty || !isValid}
            onClick={handleOrderSuccess}
          >
            Gửi thông tin
          </Button>,
        ]}
      >
        <form>
          <div className="mt-10">
            <p className="font-bold mb-4">Thông tin đơn hàng</p>
            <div>
              <p className="mb-3 font-bold text-primary">
                Số lượng sản phẩm: {carts.length}
              </p>
              <div>
                <RenderCartItem
                  carts={carts}
                  isShowCloseIcon={false}
                  setListCart={setCarts}
                />
              </div>
              <div className="mt-5 pt-5 border-t-2 border-solid border-[#EAEBED">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Tổng cộng</p>
                  <p className="font-bold">
                    {formatCurrencyWithDots(getTotalBill(carts))} đ
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-bold mb-5">Thông tin liên hệ</p>
            <div>
              <div className="form-control">
                <div className="form-control-title">
                  <span>Tên</span>
                  <div>*</div>
                </div>

                <Controller
                  name="contact_name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Bạn cần phải nhập trường này!",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Nhập tên"
                      className="admin-input"
                      id="text"
                    />
                  )}
                />
                {errors.contact_name && (
                  <FormError message={errors.contact_name.message} />
                )}
              </div>
              <div className="form-control">
                <div className="form-control-title">
                  <span>Số điện thoại</span>
                  <div>*</div>
                </div>

                <Controller
                  name="contact_phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Bạn cần phải nhập trường này!",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="admin-input"
                      id="text"
                    />
                  )}
                />
                {errors.contact_phone && (
                  <FormError message={errors.contact_phone.message} />
                )}
              </div>
              <div className="form-control">
                <div className="form-control-title">
                  <span>Email</span>
                  <div>*</div>
                </div>

                <Controller
                  name="contact_email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Bạn cần phải nhập trường này!",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Nhập email"
                      className="admin-input"
                      id="text"
                    />
                  )}
                />
                {errors.contact_email && (
                  <FormError message={errors.contact_email.message} />
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ConfirmOrderModel;
