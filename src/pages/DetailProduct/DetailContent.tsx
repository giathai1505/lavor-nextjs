"use client";
import React from "react";
import { IProduct } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TImageItem } from ".";
import EventEmitter from "events";
import { notification } from "antd";

export const ee = new EventEmitter();
ee.setMaxListeners(100);

interface IDetailContent {
  product: IProduct;
  activeVariant: TImageItem;
  onChangeColor: (data: string) => void;
  productImages: TImageItem[];
}

const DetailContent: React.FC<IDetailContent> = ({
  product,
  activeVariant,
  onChangeColor,
}) => {
  if (!product) return null;
  const [api, contextHolder] = notification.useNotification();

  const openNotificationAddCartFail = () => {
    api["error"]({
      message: "Sản phẩm đã tồn tại trong giỏ hàng!",
      description:
        "Quý khách không thể thêm hai sản phẩm giống nhau vào trong giỏ hàng! Vui lòng nhấn vào icon giỏ hàng để kiểm tra thông tin.",
    });
  };

  const openNotificationAddCartSuccess = () => {
    api["success"]({
      message: "Thêm vào giở hàng thành công!",
      description:
        "Sản phẩm đã được thêm vào giỏ hàng thành công! Vui lòng nhấn vào icon giỏ hàng để xem chi tiết.",
    });
  };

  const handleAddToCart = () => {
    let newCarts: IProduct[] = [];
    const oldCarts = localStorage.getItem("carts");

    if (oldCarts) {
      const oldCartsParsed: IProduct[] = JSON.parse(oldCarts);
      const isExist = oldCartsParsed.findIndex(
        (item) => item.product_id === product.product_id
      );
      if (isExist !== -1) {
        openNotificationAddCartFail();
        return;
      } else {
        newCarts = [...oldCartsParsed];
        ee.emit("addToCart", newCarts);
      }
    }
    newCarts.push(product);
    localStorage.setItem("carts", JSON.stringify(newCarts));
    openNotificationAddCartSuccess();
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-5 text-white">
        <div>
          <p className="db-name ">{product?.product_name}</p>
        </div>
        {product?.product_detail.length > 0 && (
          <div>
            <p className="font-bold text-primary mb-3">Thông số kĩ thuật</p>
            <ul className="flex flex-col gap-3 text-sm">
              {product &&
                Array.isArray(product.product_detail) &&
                product.product_detail.map((item) => {
                  return (
                    <li key={item.value}>
                      {item.name} : {item.value}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {product?.product_price !== 0 && (
          <div>
            <p className="dp-price">
              {formatCurrencyWithDots(product?.product_price)} <span>đ</span>
            </p>
          </div>
        )}

        {product?.variants.length > 1 && (
          <div>
            <p className="font-bold text-primary mb-3">Lựa chọn màu sắc</p>
            <div className="flex gap-2">
              {product?.variants.map((item) => {
                return (
                  <div
                    style={{ background: item.variant_color }}
                    onClick={() => onChangeColor(item.variant_color)}
                    className={`db-color-item ${
                      activeVariant.id === item.variant_color ? "active" : ""
                    }`}
                    key={item.variant_color}
                  ></div>
                );
              })}
            </div>
          </div>
        )}

        <button className="add-to-card-button" onClick={handleAddToCart}>
          <AiOutlineShoppingCart />
          <span>Thêm vào giỏ hàng</span>
        </button>
      </div>
    </>
  );
};

export default DetailContent;
