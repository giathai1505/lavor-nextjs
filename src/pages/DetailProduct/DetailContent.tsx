import { IProduct } from "@/types";
import { formatCurrencyWithDots } from "@/utilities";
import { promises } from "dns";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const listColor = ["#E6C197", "#F58220", "#ffffff"];

interface IDetailContent {
  product: IProduct;
}

const DetailContent: React.FC<IDetailContent> = ({ product }) => {
  return (
    <div className="flex flex-col gap-5 text-white">
      <div>
        <p className="db-name ">{product.product_name}</p>
      </div>
      {product.product_detail.length > 0 && (
        <div>
          <p className="font-bold text-primary mb-3">Thông số kĩ thuật</p>
          <ul className="flex flex-col gap-3 text-sm">
            {product.product_detail.map((item) => {
              return (
                <li>
                  {item.name} : {item.value}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {product.product_price !== 0 && (
        <div>
          <p className="dp-price">
            {formatCurrencyWithDots(product.product_price)} <span>đ</span>
          </p>
        </div>
      )}

      {product.variants.length > 1 && (
        <div>
          <p className="font-bold text-primary mb-3">Lựa chọn màu sắc</p>
          <div className="flex gap-2">
            {listColor.map((item, index) => {
              return (
                <div
                  style={{ background: item }}
                  className={`db-color-item ${index === 1 ? "active" : ""}`}
                ></div>
              );
            })}
          </div>
        </div>
      )}

      <button className="add-to-card-button">
        <AiOutlineShoppingCart />
        <span>Thêm vào giỏ hàng</span>
      </button>
    </div>
  );
};

export default DetailContent;
