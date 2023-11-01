import Link from "next/link";
import React from "react";

const listColor = ["#E6C197", "#F58220", "#ffffff"];

const ProductListView = () => {
  return (
    <Link href="/goi-co-cao-cap" className="lp-product-wrapper">
      <div></div>
      <img
        src="https://lavorluxury.com/wp-content/uploads/2022/10/20.png"
        alt=""
      />

      <div className="lp-product-content-wrapper">
        <p className="font-bold text-primary text-lg">Gối cổ Lavor Premium</p>
        <div>
          <span className="font-bold text-2xl mr-2">1.590.000</span>
          <span className="text-[10px]">VNĐ</span>
        </div>

        <div>
          <p className="mb-2 text-md text-primary font-bold">
            Lựa chọn màu sắc
          </p>
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
        <div>
          <p className="font-bold text-primary text-lg mb-2">
            Thông số kĩ thuật
          </p>
          <ul className="flex flex-col gap-2 text-xs">
            <li>- Cấu tạo mút định hình, da MICROFIBER</li>
            <li>- Kích thước 260x220x80mm</li>
            <li>- Số lượng: 02 chiếc/02PCS</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-primary text-md mb-2">
            Tính năng sản phẩm
          </p>
          <ul className="flex flex-col gap-2 text-xs">
            <li>- Tự động định hình lại để phù hợp với đường cong cơ thể</li>
            <li>- Tính năng thoáng khí</li>
            <li>- Tính năng điều chỉnh cao thấp</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default ProductListView;
