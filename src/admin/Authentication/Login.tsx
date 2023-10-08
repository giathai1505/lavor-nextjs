"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo/logo-black.png";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="auth-form">
      <Image src={logo} alt="" className="form-logo" />
      <p className="form-title">Sign in</p>
      <div className="flex gap-2 mt-3">
        <p>Bạn chưa có tài khoản?</p>
        <Link href="" className="form-link ">
          Đăng kí
        </Link>
      </div>
      <form action="" method="get" className="my-10">
        <div className="mb-5">
          <p className="mb-2">
            Email address <span>*</span>
          </p>
          <div className="form-element-wrapper">
            <input
              type="text"
              className="outline-none border-0 flex-1"
              placeholder="aaaa@gmail.com"
            />
          </div>
        </div>
        <div className="mb-5">
          <p className="mb-2">
            Password <span>*</span>
          </p>
          <div className="form-element-wrapper">
            <input
              type="text"
              className="outline-none border-0 flex-1"
              placeholder="*******"
            />
            <div className="eye-wrapper">
              {isShowPassword ? (
                <AiFillEyeInvisible className="auth-form-icon" />
              ) : (
                <AiFillEye className="auth-form-icon" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex gap-2">
            <input type="checkbox" name="" id="" />
            <p>Remember me</p>
          </div>

          <Link href="" className="form-link ">
            Forgot password?
          </Link>
        </div>
        <button className="auth-form-button">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
