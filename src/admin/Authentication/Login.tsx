"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo/logo-black.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { loginAPI } from "@/api/authAPI";
import { useRouter } from "next/navigation";

type ILoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<ILoginForm>({
    mode: "all",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleLogin = async (data: ILoginForm) => {
    try {
      const response = await loginAPI(data);

      if (response?.access_token) {
        const { access_token } = response;

        localStorage.setItem("token", access_token);
        router.push("/admin");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
      <Image src={logo} alt="" className="form-logo" />
      <p className="form-title">Đăng nhập</p>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-5">
          <p className="mb-2">
            Email <span>*</span>
          </p>
          <div>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Bạn cần phải nhập username!",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  onBlur={() => {
                    if (!field.value) {
                      field.onChange("");
                    }
                  }}
                  placeholder="Nhập email"
                  className="admin-input"
                  id="text"
                />
              )}
            />
            {errors.username && <FormError message={errors.username.message} />}
          </div>
        </div>
        <div className="mb-5">
          <p className="mb-2">
            Mật khẩu <span>*</span>
          </p>

          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Bạn cần phải nhập mật khẩu!",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  onBlur={() => {
                    if (!field.value) {
                      field.onChange("");
                    }
                  }}
                  placeholder="Nhập mật khẩu"
                  className="admin-input"
                  id="text"
                />
              )}
            />
            {errors.password && <FormError message={errors.password.message} />}
          </div>
        </div>

        <button className="auth-form-button">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
