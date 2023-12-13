'use client'
import Login from "@/admin/Authentication/Login";
import React, { use } from "react";
import {signIn, useSession} from "next-auth/react"


const page = () => {
  const a = useSession();

  console.log(a)
  const handleSubmit = async () => {
   signIn("credentials", {
      username: "admin",
      password: "12121212",
      redirect: true,
      callbackUrl: "/admin"

    })
  }
  return <div>
    <button onClick={handleSubmit}>hello</button>
  </div> 
};

export default page;
