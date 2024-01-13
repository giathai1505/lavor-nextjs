"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo/logo-white.webp";
import { BsList } from "react-icons/bs";
import { IProduct } from "@/types/type";
import { ee } from "@/pages/DetailProduct/DetailContent";
import Cart from "./Cart";
import ConfirmOrderModel from "./ConfirmOrderModel";
import PhoneDrawerNavbar from "./PhoneDrawerNavbar";
import { eventKeys, webRouter } from "@/constants/constants";

const PhoneHeader = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [carts, setCarts] = useState<IProduct[]>([]);
  const [confirmModelOpen, setConfirmModelOpen] = useState<boolean>(false);

  const handleEventAddToCart = (carts: IProduct[]) => {
    setCarts(carts);
  };

  //listen add to cart event then update the carts
  ee.on(eventKeys.ADD_TO_CART, handleEventAddToCart);

  useEffect(() => {
    const carts = localStorage.getItem("carts");
    if (carts) {
      const parsedCarts: IProduct[] = JSON.parse(carts);
      Array.isArray(parsedCarts) && parsedCarts.length > 0
        ? setCarts(parsedCarts)
        : setCarts([]);
    }
  }, []);

  return (
    <div>
      <div className="header-phone-wrapper">
        <Link href={webRouter.user.HOME_PAGE}>
          <Image
            src={logo}
            alt="Logo Lavor"
            priority={true}
            className={`w-[100px] logo-img md:w-[160px]`}
          />
        </Link>
        <div className="flex items-center gap-5">
          <Cart
            showConfirmModal={setConfirmModelOpen}
            carts={carts}
            setCarts={setCarts}
          />
          <BsList
            className="w-[30px] h-[30px] text-white cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
        </div>
      </div>

      <PhoneDrawerNavbar setShow={setShowSidebar} show={showSidebar} />

      <ConfirmOrderModel
        carts={carts}
        setCarts={setCarts}
        isShow={confirmModelOpen}
        setShow={setConfirmModelOpen}
      />
    </div>
  );
};

export default PhoneHeader;
