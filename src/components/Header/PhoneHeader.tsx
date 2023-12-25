"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo/logo-white.png";
import { BsList } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import { userNavbarData } from "@/assets/staticData";
import { IProduct } from "@/types/type";
import { ee } from "@/pages/DetailProduct/DetailContent";
import Cart from "./Cart";
import ConfirmOrderModel from "./ConfirmOrderModel";

const PhoneHeader = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const path = usePathname();
  const [carts, setCarts] = useState<IProduct[]>([]);
  const [confirmModelOpen, setConfirmModelOpen] = useState<boolean>(false);

  const handleEventAddToCart = (carts: IProduct[]) => {
    setCarts(carts);
  };

  ee.on("addToCart", handleEventAddToCart);

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
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Lavor"
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

      <div
        className={`fixed inset-0 z-40 bg-[#0000006e] ${
          showSidebar ? "" : "hidden"
        }`}
      ></div>

      <div
        className={`header-phone-menubar w-[400px] ${
          showSidebar ? "left-0" : "left-[100%]"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={logo} alt="Logo" className={`w-[100px] logo-img`} />
          </Link>
          <MdClose
            className="w-[30px] h-[30px] text-white cursor-pointer"
            onClick={() => setShowSidebar(false)}
          />
        </div>
        <div className="text-white py-5">
          {userNavbarData.map((item) => {
            return (
              <div className="nav-item-phone" key={item.id}>
                <Link
                  href={item.slug}
                  className={`cursor-pointer navbar-item px-5 py-5 block ${
                    path?.toString() === item.slug
                      ? "text-primary"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
                <div className="sub-nav -left-1/2 absolute translate-x-1/3">
                  <ul className="mt-5">
                    {item.children && item.children.length > 0
                      ? item.children.map((child, index) => {
                          return (
                            <li
                              className="relative mb-2 bg-primary text-center nav-sub-item leading-3 w-32"
                              key={index.toString()}
                            >
                              <Link
                                href={child?.slug}
                                className="relative z-10 py-2 block"
                              >
                                <span className="z-10 text-white uppercase text-[130x] hover:text-[#2d2d2d]">
                                  {child.name}
                                </span>
                              </Link>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
