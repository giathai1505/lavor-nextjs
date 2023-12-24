"use client";
import React from "react";
import { IProduct } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { TImageItem } from ".";
import EventEmitter from "events";

export const ee = new EventEmitter();

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

  const handleAddToCart = () => {
    let newCarts: IProduct[] = [];
    const oldCarts = localStorage.getItem("carts");

    if (oldCarts) {
      const oldCartsParsed: IProduct[] = JSON.parse(oldCarts);
      const isExist = oldCartsParsed.findIndex(
        (item) => item.product_id === product.product_id
      );
      if (isExist !== -1) {
        toast.error("Sản phẩm đã có trong giỏ hàng!", {
          position: "top-right",
        });
        return;
      } else {
        newCarts = [...oldCartsParsed];
        ee.emit("addToCart", newCarts);
      }
    }
    newCarts.push(product);
    localStorage.setItem("carts", JSON.stringify(newCarts));
    toast.success("Thêm sản phẩm vào giỏ hàng thành công!!!", {
      position: "top-right",
    });
  };

  return (
    <>
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
                    <li>
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
      <ToastContainer />
    </>
  );
};

export default DetailContent;
