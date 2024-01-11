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
import "@/assets/styles/swiper.css";
import "@/pages/News/blog.css";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "@/components/Common/SessionProvider";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
