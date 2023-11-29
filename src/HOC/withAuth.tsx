"use client";
import React from "react";
import { redirect } from "next/navigation";
import { getTokenFromLocalStorage } from "@/utilities";

interface WithAuthProps {
  // You can define additional props that the wrapped component might receive
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const token = getTokenFromLocalStorage();

    if (!token) {
      redirect("/admin/auth/login");
    }
    return <>{token ? <WrappedComponent {...props} /> : null}</>;
  };

  return WithAuth;
};

export default withAuth;
