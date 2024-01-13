"use client";
import React from "react";
import { userNavbarData } from "@/assets/staticData";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo/logo-white.webp";
import { MdClose } from "react-icons/md";

type TProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};

const PhoneDrawerNavbar: React.FC<TProps> = ({ show, setShow }) => {
  const path = usePathname();
  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={logo} alt="Logo" className={`w-[100px] logo-img`} />
          </Link>
        </div>
      }
      closeIcon={<MdClose className="text-white" />}
      placement="right"
      onClose={() => setShow(false)}
      open={show}
      style={{ background: "black" }}
    >
      <div className="text-white py-5">
        {userNavbarData.map((item) => {
          return (
            <div className="nav-item-phone" key={item.id}>
              <Link
                href={item.slug}
                className={`cursor-pointer navbar-item px-5 py-5 block ${
                  path?.toString() === item.slug ? "text-primary" : "text-white"
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
    </Drawer>
  );
};

export default PhoneDrawerNavbar;
