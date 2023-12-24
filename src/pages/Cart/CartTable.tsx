"use client";
import { IProduct } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

const EmptyCart = () => {
  return (
    <div className="flex justify-center">
      <p>(Không có sản phẩm nào)</p>
    </div>
  );
};

const CartTable = () => {
  const [cartData, setCartData] = useState<IProduct[]>([]);

  useEffect(() => {
    const carts = localStorage.getItem("carts");
    if (carts) {
      const parsedCarts: IProduct[] = JSON.parse(carts);
      setCartData(parsedCarts);
    }
  }, []);

  const handldeRemoveItemFromCart = (id: number) => {
    const carts = localStorage.getItem("carts");
    if (carts) {
      const parsedCarts: IProduct[] = JSON.parse(carts);
      if (Array.isArray(parsedCarts) && parsedCarts.length > 0) {
        const removeIndex = parsedCarts.findIndex(
          (item) => item.product_id === id
        );

        parsedCarts.splice(removeIndex, 1);
        setCartData(parsedCarts);
        localStorage.setItem("carts", JSON.stringify(parsedCarts));
      }
    }
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Sản phẩm",
      render: (_: any, record: IProduct) => {
        return (
          <div className="flex items-center gap-5 ml-10">
            <img
              src={"http://" + record.product_images[0]}
              alt="Hình ảnh sản phẩm"
              className="w-20 h-20 rounded-sm object-cover"
            />
            <p>{record.product_name}</p>
          </div>
        );
      },
    },
    {
      title: "Danh mục",
      render: (_: any, record: IProduct) => {
        return (
          <div>
            <p>{record.product_type}</p>
          </div>
        );
      },
    },

    {
      title: "Giá",
      render: (_: any, record: IProduct) => {
        return (
          <div>
            <p>{formatCurrencyWithDots(record.product_price)} đ</p>
          </div>
        );
      },
    },

    {
      title: "",
      render: (_: any, record: any) => {
        return (
          <button
            className="button-delete-row-selection "
            onClick={() => handldeRemoveItemFromCart(record.product_id)}
          >
            <BsTrash />
            <span>Xóa</span>
          </button>
        );
      },
    },
  ];

  return (
    <div className="p-10">
      <Table
        locale={{ emptyText: <EmptyCart /> }}
        dataSource={cartData}
        columns={columns}
        bordered
        pagination={false}
      />
      <div></div>
    </div>
  );
};

export default CartTable;
