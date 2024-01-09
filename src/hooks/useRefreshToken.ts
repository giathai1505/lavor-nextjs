"use client";

import axios from "@/lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refreshToken: session?.user.refresh_token,
    });

    console.log("==== new token: ", res.data);
    if (session) {
      await update({
        ...session,
        user: res.data,
      });
    } else signIn();
  };
  return refreshToken;
};
