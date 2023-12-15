import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import { BiLogOutCircle } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AdminSidebarCategories } from "@/assets/staticData";

interface IPageProps {
  show: boolean;
}

const AdminSidebar: React.FC<IPageProps> = ({ show }) => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.replace("/admin/login");
  };
  return (
    <div className={`sidebar-wrapper ${show ? "show" : ""}`}>
      <div></div>
      <div className="sidebar-avatar">
        <Link href="/admin">
          <Image src={logo} alt="logo-white" className="sidebar-logo" />
        </Link>
        <p>Xin chào Lavor</p>
      </div>
      <p className="dashboard-text ">DASHBOARD</p>
      <ul className="px-3">
        {AdminSidebarCategories.map((item, index) => {
          return (
            <li
              className={`sidebar-item ${
                path?.toString().includes(item.link) ? "active" : ""
              }`}
              key={index}
            >
              <Link
                href={item.link}
                className="flex gap-5 items-center text-[14px] text-white"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-logout" onClick={handleLogout}>
        <BiLogOutCircle />
        <span>Đăng xuất</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
