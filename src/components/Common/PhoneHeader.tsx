"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/images/logo/logo-white.png";
import { BsList } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { navBar } from "@/data/navbar";
import { usePathname } from "next/navigation";

const PhoneHeader = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const path = usePathname();

  return (
    <div>
      <div className="flex p-2 md:p-3 justify-between items-center fixed top-0 left-0 right-0 z-30 bg-black">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            className={`w-[100px] logo-img md:w-[160px]`}
          />
        </Link>
        <BsList
          className="w-[30px] h-[30px] text-white cursor-pointer"
          onClick={() => setShowSidebar(true)}
        />
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
          {navBar.map((item) => {
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
    </div>
  );
};

export default PhoneHeader;
