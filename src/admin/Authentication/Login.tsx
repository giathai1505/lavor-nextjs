"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo/logo-black.png";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { loginAPI } from "@/api/authAPI";
import { useRouter } from "next/navigation";
import { CircleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

type ILoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      const response = await loginAPI(data);

      if (response?.access_token) {
        setIsLoading(false);
        toast.success("Đăng nhập thành công!!!", {
          position: "top-center",
        });
        const { access_token } = response;

        localStorage.setItem("token", access_token);
        router.push("/admin");
      } else {
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại!!!", {
        position: "top-center",
      });
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
      <Image src={logo} alt="Logo Lavor" className="form-logo" />
      <p className="font-bold text-3xl">Sign in</p>

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
                  className="auth-input"
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
                  type="password"
                  onBlur={() => {
                    if (!field.value) {
                      field.onChange("");
                    }
                  }}
                  placeholder="Nhập mật khẩu"
                  className="auth-input"
                />
              )}
            />
            {errors.password && <FormError message={errors.password.message} />}
          </div>
        </div>

        <button className={`auth-form-button ${isLoading && "disabled"}`}>
          {isLoading && (
            <CircleLoader
              color={"#ffffff"}
              loading={isLoading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          Đăng nhập
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
