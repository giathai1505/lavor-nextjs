import React from "react";
import { Button, Modal } from "antd";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { RenderCartItem, getTotalBill } from "./Cart";
import { Controller, useForm } from "react-hook-form";
import FormError from "../Common/FormError";
import { IProduct } from "@/types/type";
import { sendOrder } from "@/api/productAPI";
import useToast from "@/hooks/useToast";

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
  const { contextHolder, showNotification } = useToast();

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
    getValues,
  } = form;

  const handleOrderSuccess = async () => {
    try {
      const contactInformation = getValues();

      const orderInfo = carts.map((item) => {
        return {
          product_id: item.product_id,
          product_name: item.product_name,
          product_quantity: 1,
          product_price: item.product_price,
          product_sum: item.product_price,
          variants: item.variants[0].variant_color,
        };
      });

      const requestData = {
        products: [...orderInfo],
        ...contactInformation,
      };

      const result: any = await sendOrder(requestData);

      setShow(false);
      reset({
        contact_email: "",
        contact_name: "",
        contact_phone: "",
      });

      localStorage.setItem("carts", JSON.stringify([]));
      setCarts([]);

      showNotification(
        "success",
        "Đơn hàng thành công!",
        "Đơn hàng đã được gửi đến bộ phận quản lý. Sẽ có nhân viên liên hệ và hỗ trợ quý khách. Cảm ơn quý khách đã tin tưởng và ủng hộ Lavor!"
      );
    } catch (error) {
      showNotification(
        "error",
        "Đơn hàng thất bại!",
        "Lỗi hệ thống! Vui lòng thử lại sau."
      );
    }
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
