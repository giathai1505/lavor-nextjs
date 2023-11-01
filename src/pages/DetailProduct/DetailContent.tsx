import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const listColor = ["#E6C197", "#F58220", "#ffffff"];

const DetailContent = () => {
  return (
    <div className="flex flex-col gap-5 text-white">
      <div>
        <p className="db-name ">Gối cổ Lavor Premiem</p>
      </div>
      <div>
        <p className="font-bold text-primary mb-3">Thông số kĩ thuật</p>
        <ul className="flex flex-col gap-3 text-sm">
          <li>Cấu tạo: Mút định hình, da MICROFIBER</li>
          <li>Kích thước: 260x220x80mm</li>
          <li>Số lượng: 02 chiếc/02PCS</li>
        </ul>
      </div>
      <div>
        <p className="dp-price">
          1.590.000 <span>VNĐ</span>
        </p>
      </div>
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
      <button className="add-to-card-button">
        <AiOutlineShoppingCart />
        <span>Thêm vào giỏ hàng</span>
      </button>
    </div>
  );
};

export default DetailContent;
