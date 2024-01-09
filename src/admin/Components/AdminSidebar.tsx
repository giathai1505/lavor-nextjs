import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import { BiLogOutCircle } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AdminSidebarCategories } from "@/assets/staticData";

const renderAdminMenu = (menu: any[]) => {
  if (menu.length === 0) return null;
  const path = usePathname();

  const menuItemClass = (itemUrl: string): string => {
    let className = "sidebar-item";
    if (path?.toString().includes(itemUrl)) {
      className += " active";
    }
    return className;
  };

  return (
    <ul className="px-3">
      {menu.map((item, index) => {
        return (
          <li key={index} className={menuItemClass(item.link)}>
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

      {renderAdminMenu(AdminSidebarCategories)}

      <button className="sidebar-logout" onClick={handleLogout}>
        <BiLogOutCircle />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
