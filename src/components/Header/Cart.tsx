import { Badge, Drawer, Empty } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import cartIcon from "@/assets/images/common/cart-icon.webp";
import { IProduct, ProductTypeToText } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { localStorageKeys, webRouter } from "@/constants/constants";

const STATIC_TEXT = {
  emptyCart: "Giỏ hàng rỗng",
  cartName: "Giỏ hàng",
};

export const getTotalBill = (products: IProduct[]): number => {
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

export const RenderCartItem: React.FC<TRenderCartItem> = ({
  carts,
  setListCart,
  isShowCloseIcon,
}) => {
  if (carts.length === 0) return <Empty description={STATIC_TEXT.emptyCart} />;

  const handldeRemoveItemFromCart = (id: number) => {
    const carts = localStorage.getItem(localStorageKeys.CARTS);
    if (carts) {
      const parsedCarts: IProduct[] = JSON.parse(carts);
      if (Array.isArray(parsedCarts) && parsedCarts.length > 0) {
        const removeIndex = parsedCarts.findIndex(
          (item) => item.product_id === id
        );

        parsedCarts.splice(removeIndex, 1);
        setListCart(parsedCarts);
        localStorage.setItem(
          localStorageKeys.CARTS,
          JSON.stringify(parsedCarts)
        );
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
                src={item.product_images[0]}
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

type TProps = {
  showConfirmModal: (value: boolean) => void;
  carts: IProduct[];
  setCarts: (carts: IProduct[]) => void;
};

const Cart: React.FC<TProps> = ({ showConfirmModal, carts, setCarts }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <Badge count={carts.length}>
          <Image
            src={cartIcon}
            alt={STATIC_TEXT.cartName}
            className="w-8 h-8 object-cover cursor-pointer"
            loading="eager"
          />
        </Badge>
      </div>

      <Drawer
        title={STATIC_TEXT.cartName}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div>
          <RenderCartItem
            carts={carts}
            isShowCloseIcon={true}
            setListCart={setCarts}
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
              href={webRouter.user.sanPham}
              className="block  text-white bg-black font-bold py-3 text-center hover:text-white hover:bg-primary"
            >
              Tiếp tục mua hàng
            </Link>
            <button
              className={`border-2 border-solid border-black font-bold py-[10px] hover:text-white hover:bg-primary hover:border-primary ${
                carts.length === 0 && "opacity-30 pointer-events-none"
              }`}
              onClick={() => showConfirmModal(true)}
            >
              Liên hệ đặt hàng
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
