import CategoryIcon from "@/assets/icons/adminDashboard/CategoryIcon";
import ContactIcon from "@/assets/icons/adminDashboard/ContactIcon";
import ProductCategoryIcon from "@/assets/icons/adminDashboard/ProductCategoryIcon";
import ProductIcon from "@/assets/icons/adminDashboard/ProductIcon";
import React from "react";

const AdminDashboard = () => {

  return (
    <div>
      <div className="grid grid-cols-4 gap-10">
        <div className="dashboard-part one">
          <div className="flex items-center gap-5">
            <ProductIcon className="icon" />
            <p>Tổng số sản phẩm</p>
          </div>
          <p className="number">46</p>
          <div className="desc">
            <p>Còn hàng: 40</p>
            <p>Hết hàng: 6</p>
          </div>
        </div>
        <div className="dashboard-part two">
          <div className="flex items-center gap-5">
            <ProductCategoryIcon className="icon" />
            <p>Danh mục sản phẩm</p>
          </div>
          <p className="number">5</p>
        </div>
        <div className="dashboard-part three">
          <div className="flex items-center gap-5">
            <CategoryIcon className="icon" />
            <p>Tổng số bài viết</p>
          </div>
          <p className="number">42</p>
          <div className="desc">
            <p>Hoạt động: 36</p>
            <p>Ngừng hoạt động: 6</p>
          </div>
        </div>
        <div className="dashboard-part four">
          <div className="flex items-center gap-5">
            <ContactIcon className="icon" />
            <p>Tổng số liên hệ</p>
          </div>
          <p className="number">16</p>
          <div className="desc">
            <p>Đã đọc: 10</p>
            <p>Chưa đọc 6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
