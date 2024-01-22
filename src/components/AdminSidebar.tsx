import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo/logo-white.webp";
import Image from "next/image";
import { BiLogOutCircle } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AdminSidebarCategories } from "@/assets/staticData";
import Each from "@/lib/Each";

const renderMenuItem = (menu: any, index: number) => {
  const path = usePathname();
  const menuItemClass = (itemUrl: string): string => {
    let className = "sidebar-item";
    if (path?.toString().includes(itemUrl)) {
      className += " active";
    }
    return className;
  };
  return (
    <li key={index} className={menuItemClass(menu.link)}>
      <Link
        href={menu.link}
        className="flex gap-5 items-center text-[14px] text-white"
      >
        {menu.icon}
        <span>{menu.name}</span>
      </Link>
    </li>
  );
};

interface IPageProps {
  show: boolean;
}

const AdminSidebar: React.FC<IPageProps> = ({ show }) => {
  const router = useRouter();

  const handleLogout = async () => {
    signOut({ redirect: false }).then(() => {
      router.push("/admin/login");
    });
  };

  return (
    <div className={`sidebar-wrapper ${show ? "show" : ""}`}>
      <div className="sidebar-avatar">
        <Link href="/admin">
          <Image src={logo} alt="logo-white" className="sidebar-logo" />
        </Link>
        <p>Xin chào Lavor</p>
      </div>

      <p className="dashboard-text">DASHBOARD</p>

      <ul className="px-3">
        <Each
          of={AdminSidebarCategories}
          render={(item, index) => renderMenuItem(item, index)}
        />
      </ul>

      <button className="sidebar-logout" onClick={handleLogout}>
        <BiLogOutCircle />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
