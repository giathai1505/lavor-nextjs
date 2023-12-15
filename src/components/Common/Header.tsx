"use client";
import React, { useLayoutEffect, useState } from "react";
import logo from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userNavbarData } from "@/assets/staticData";

const Header = () => {
  const [showFullHeader, setShowFullHeader] = useState(true);
  const path = usePathname();

  useLayoutEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 100) {
      setShowFullHeader(false);
    } else {
      setShowFullHeader(true);
    }
  };

  return (
    <div
      className={`h-[110px] text-white text-[13px] header fixed left-0 top-0 z-30 w-[100vw] ${
        showFullHeader
          ? "before:left-[40%] before:h-[100%]"
          : "before:left-[-35px] before:h-[90%]"
      }`}
    >
      <div className="w-[1200px] justify-between h-full flex mx-auto">
        <div className="logo mt-[16px] z-20">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              className={`${
                showFullHeader ? "w-[210px]" : "w-[120px]"
              } logo-img`}
            />
          </Link>
        </div>
        <div className="flex z-10 mt-10">
          {userNavbarData.map((item) => {
            return (
              <div className="relative nav-item" key={item.id}>
                <Link
                  href={item.slug}
                  className={`font-bold uppercase cursor-pointer hover:text-primary navbar-item px-5 py-2 ${
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
                                <span className="z-10 text-white uppercase font-bold text-[130x] hover:text-[#2d2d2d]">
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

export default Header;
