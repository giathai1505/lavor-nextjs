import React from "react";

const BlogCategory = () => {
  return (
    <div className="category-container">
      <p className="font-bold text-lg mb-4">Danh mục</p>
      <div className="border border-solid border-[#8080805e] mb-5 p-5 pl-10">
        <ul>
          <li>
            <div className="flex justify-between">
              <span>Về Lavor</span>
              <span>(10)</span>
            </div>
          </li>
          <li>
            <div className="flex justify-between">
              <span>Kiến thức và mẹo</span>
              <span>(6)</span>
            </div>
          </li>
          <li>
            <div className="flex justify-between">
              <span>Tuyển dụng</span>
              <span>(23)</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogCategory;
