"use client";

import "./globals.css";
import "@/assets/styles/common.css";
import "@/assets/styles/components.css";
import "@/assets/styles/designPage.css";
import "@/assets/styles/homepage.css";
import "@/assets/styles/aboutUsPage.css";
import "@/assets/styles/carousel.css";
import "@/assets/styles/productPage.css";
import "@/assets/styles/admin/auth.css";
import "@/assets/styles/admin/dashboard.css";
import "@/assets/styles/admin/table.css";
import "@/assets/styles/admin/dialog.css";
import "@/assets/styles/admin/blog.css";
import "@/pages/News/blog.css";
import "react-toastify/dist/ReactToastify.css";

import { Assistant } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";


const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
});

export default function RootLayout({
  children,
  session,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={assistant.className}>

        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
