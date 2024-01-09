"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo/logo-black.png";
import { Controller, useForm } from "react-hook-form";
import FormError from "@/components/Common/FormError";
import { useRouter } from "next/navigation";
import { CircleLoader } from "react-spinners";
import { signIn } from "next-auth/react";
import useToast from "@/hooks/useToast";

type ILoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {contextHolder, showNotification} = useToast()

  const form = useForm<ILoginForm>({
    defaultValues: {
      username: "admin",
      password: "12345678",
    },
    mode: "all",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleLogin = async (data: ILoginForm) => {
    setIsLoading(true);
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })
      .then((result) => {
        setIsLoading(false);

        if (result?.ok) {
          showNotification("success", "Đăng nhập thành công!", "")
          router.push("/admin");
        } else {
          showNotification("error", "Đăng nhập thât bại!", "Vui lòng thử lại sau.")
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
   {contextHolder}
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
    </div>
 </>
  );
};

export default Login;
