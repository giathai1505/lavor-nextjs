"use client";
import React, { useLayoutEffect, useState } from "react";
import logo from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userNavbarData } from "@/assets/staticData";
import cartIcon from "@/assets/images/common/cart-icon.png";
import searchIcon from "@/assets/images/common/search-icon.png";
import { Badge, Button, Drawer, Empty, Modal, notification } from "antd";
import { IProduct, ProductTypeToText } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { Controller, useForm } from "react-hook-form";
import FormError from "./FormError";
import { AiOutlineClose } from "react-icons/ai";
import { ee } from "@/pages/DetailProduct/DetailContent";
import SearchBox from "../Header/SearchBox";

type IOrderContact = {
  contact_name: string;
  contact_phone: string;
  contact_email: string;
};

const getTotalBill = (products: IProduct[]): number => {
  if (products.length === 0) return 0;
  let total: number = 0;
  products.forEach((item) => {
    total += item.product_price;
  });

  return total;
};

type TRenderCartItem = {
  carts: IProduct[];
  setListCart: (carts: IProduct[]) => void;
  isShowCloseIcon: boolean;
};

const RenderCartItem: React.FC<TRenderCartItem> = ({
  carts,
  setListCart,
  isShowCloseIcon,
}) => {
  if (carts.length === 0) return <Empty description="Giỏ hàng rỗng" />;

  const handldeRemoveItemFromCart = (id: number) => {
    const carts = localStorage.getItem("carts");
    if (carts) {
      const parsedCarts: IProduct[] = JSON.parse(carts);
      if (Array.isArray(parsedCarts) && parsedCarts.length > 0) {
        const removeIndex = parsedCarts.findIndex(
          (item) => item.product_id === id
        );

        parsedCarts.splice(removeIndex, 1);
        setListCart(parsedCarts);
        localStorage.setItem("carts", JSON.stringify(parsedCarts));
      }
    }
  };

  return (
    <>
      {carts.map((item) => {
        return (
          <div
            className="flex justify-between items-center"
            key={item.product_id}
          >
            <div className="flex gap-5 mb-5">
              <img
                src={"http://" + item.product_images[0]}
                className="w-20 h-20 rounded object-cover"
              />
              <div className=" flex flex-col gap-[5px] mb-1">
                <p className="font-bold">{item.product_name}</p>
                <p className="font-bold text-primary">
                  {formatCurrencyWithDots(item.product_price)} đ
                </p>
                <p className="text-white bg-black w-fit px-4 py-1 rounded-xl text-xs">
                  {ProductTypeToText[item.product_type]}
                </p>
              </div>
            </div>
            {isShowCloseIcon && (
              <AiOutlineClose
                className="cursor-pointer"
                onClick={() => handldeRemoveItemFromCart(item.product_id)}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const Header = () => {
  const [showFullHeader, setShowFullHeader] = useState(true);
  const [carts, setcarts] = useState<IProduct[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [confirmModelOpen, setConfirmModelOpen] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const path = usePathname();

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

  const handleEventAddToCart = (carts: IProduct[]) => {
    setcarts(carts);
  };

  ee.on("addToCart", handleEventAddToCart);

  useLayoutEffect(() => {
    document.addEventListener("scroll", handleScroll);

    const carts = localStorage.getItem("carts");
    if (carts) {
      const parsedCarts: IProduct[] = JSON.parse(carts);
      Array.isArray(parsedCarts) && parsedCarts.length > 0
        ? setcarts(parsedCarts)
        : setcarts([]);
    }

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 100) {
      setShowFullHeader(false);
    } else {
      setShowFullHeader(true);
    }
  };

  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Đơn hàng thành công!",
      description:
        "Đơn hàng đã được gửi đến bộ phận quản lý. Sẽ có nhân viên liên hệ và hỗ trợ quý khách. Cảm ơn quý khách đã tin tưởng và ủng hộ Lavor!",
    });
  };

  const handleOrderSuccess = () => {
    setConfirmModelOpen(false);
    setOpen(false);
    openNotificationWithIcon();

    //reset form value
    reset({
      contact_email: "",
      contact_name: "",
      contact_phone: "",
    });

    //clear cart
    localStorage.setItem("carts", JSON.stringify([]));
    setcarts([]);
  };

  return (
    <>
      {contextHolder}
      <div
        className={`h-[110px] text-white text-[13px] header fixed left-0 top-0 z-30 w-[100vw] ${
          showFullHeader
            ? "before:left-[40%] before:h-[100%]"
            : "before:left-[-35px] before:h-[90%]"
        }`}
      >
        <div className="justify-between h-full flex mx-auto">
          <div className="logo mt-[16px] ml-[10%] z-20">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                className={`${
                  showFullHeader ? "w-[210px]" : "w-[120px]"
                } logo-img`}
              />
            </Link>
          </div>
          <div className="flex z-10 mt-5 mr-[5%]">
            <div className="flex mt-5">
              {userNavbarData.map((item) => {
                return (
                  <div className="relative nav-item" key={item.id}>
                    <Link
                      href={item.slug}
                      className={`font-bold uppercase cursor-pointer hover:text-primary navbar-item px-5 py-2 ${
                        path?.toString() === item.slug
                          ? "text-primary"
                          : "text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                    <div className="sub-nav -left-1/2 absolute translate-x-1/3">
                      <ul className="mt-5">
                        {item.children && item.children.length > 0
                          ? item.children.map((child, index) => {
                              return (
                                <li
                                  className="relative mb-2 bg-primary text-center nav-sub-item leading-3 w-32"
                                  key={index.toString()}
                                >
                                  <Link
                                    href={child?.slug}
                                    className="relative z-10 py-2 block"
                                  >
                                    <span className="z-10 text-white uppercase font-bold text-[130x] hover:text-[#2d2d2d]">
                                      {child.name}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })
                          : null}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-5 ml-5 mt-2">
              <div className="relative">
                <Image
                  src={searchIcon}
                  alt="Tìm kiếm sản phẩm"
                  className="w-8 h-8 object-cover cursor-pointer"
                  loading="eager"
                  onClick={() => setIsShowSearch(true)}
                />
                {isShowSearch && (
                  <SearchBox
                    show={isShowSearch}
                    close={() => setIsShowSearch(false)}
                  />
                )}
              </div>

              <div onClick={() => setOpen(true)}>
                <Badge count={carts.length}>
                  <Image
                    src={cartIcon}
                    alt="Giỏ hàng"
                    className="w-8 h-8 object-cover cursor-pointer"
                    loading="eager"
                  />
                </Badge>
              </div>

              <Drawer
                title="Giỏ hàng "
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
              >
                <div>
                  <RenderCartItem
                    carts={carts}
                    isShowCloseIcon={true}
                    setListCart={setcarts}
                  />
                </div>
                <div className="mt-20 pt-5 border-t-2 border-solid border-[#EAEBED">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Tổng cộng</p>
                    <p className="font-bold">
                      {formatCurrencyWithDots(getTotalBill(carts))} đ
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 mt-10">
                    <Link
                      href={"/san-pham"}
                      className="block  text-white bg-black font-bold py-3 text-center hover:text-white hover:bg-primary"
                    >
                      Tiếp tục mua hàng
                    </Link>
                    <button
                      className={`border-2 border-solid border-black font-bold py-[10px] hover:text-white hover:bg-primary hover:border-primary ${
                        carts.length === 0 && "opacity-30 pointer-events-none"
                      }`}
                      onClick={() => setConfirmModelOpen(true)}
                    >
                      Liên hệ đặt hàng
                    </button>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Xác nhận đơn hàng"
        open={confirmModelOpen}
        onCancel={() => setConfirmModelOpen(false)}
        footer={[
          <Button key="back" onClick={() => setConfirmModelOpen(false)}>
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
                  setListCart={setcarts}
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
                      onBlur={() => {
                        if (!field.value) {
                          field.onChange("");
                        }
                      }}
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
                      onBlur={() => {
                        if (!field.value) {
                          field.onChange("");
                        }
                      }}
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
                      onBlur={() => {
                        if (!field.value) {
                          field.onChange("");
                        }
                      }}
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

export default Header;
