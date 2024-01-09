"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import axios, { axiosAuth } from "@/lib/axios";

const useAxiosAuth = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${session?.user?.access_token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const res = await axios.post("/auth/refresh", {
              refreshToken: session?.user.refresh_token,
            });

            if (session && res) {
              await update({
                ...session,
                user: res.data,
              });

              prevRequest.headers[
                "Authorization"
              ] = `Bearer ${res.data.access_token}`;

              return axiosAuth(prevRequest);
            } else {
              signOut();
            }
          } catch (error) {
            signOut();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return axiosAuth;
};

export default useAxiosAuth;
