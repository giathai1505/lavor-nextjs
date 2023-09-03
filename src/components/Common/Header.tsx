"use client";
import { navBar } from "@/data/navbar";
import React, { useLayoutEffect, useRef, useState } from "react";
import logo from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    const currentScroll = window.screenY || document.documentElement.scrollTop;
    if (currentScroll > 100) {
      setShowFullHeader(false);
    } else {
      setShowFullHeader(true);
    }
  };

  return (
    <div
      className={`h-[110px] text-white text-[13px] header fixed left-0 top-0 z-10 w-[100vw] ${
        showFullHeader
          ? "before:left-[43%] before:h-[100%]"
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
        <div className="flex gap-[35px] z-10 mt-10">
          {navBar.map((item) => {
            return (
              <div className="nav-item h-fit relative">
                <Link
                  href={item.slug}
                  className={`font-bold uppercase cursor-pointer hover:text-primary navbar-item ${
                    path.toString() === item.slug
                      ? "text-primary"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
                <div className="sub-nav -left-1/2 absolute">
                  <ul className="mt-5">
                    {item.children && item.children.length > 0
                      ? item.children.map((child) => {
                          return (
                            <li className="relative mb-2 bg-primary text-center p-2 nav-sub-item leading-3 w-32">
                              <Link
                                href={child?.slug}
                                className="relative z-10"
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
