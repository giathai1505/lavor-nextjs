import { sidebarList } from "@/data/adminSidebar";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import { BiLogOutCircle } from "react-icons/bi";
import { usePathname } from "next/navigation";

interface IPageProps {
  show: boolean;
}

const AdminSidebar: React.FC<IPageProps> = ({ show }) => {
  const path = usePathname();

  const handleLogout = () => {
    console.log("Log out");
  };
  return (
    <div className={`sidebar-wrapper ${show ? "show" : ""}`}>
      <div>
        <Image src={logo} alt="logo-white" className="sidebar-logo" />
      </div>
      <div className="sidebar-avatar">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmhlrf66Hw4fjnB1SV-c0Ndqn2iitK_DMWw&usqp=CAU"
          alt=""
          className="w-24 h-24 rounded-full object-cover"
        />
        <p>Ngo Gia Thai</p>
      </div>
      <p className="dashboard-text ">DASHBOARD</p>
      <ul className="px-3">
        {sidebarList.map((item, index) => {
          return (
            <li
              className={`sidebar-item ${
                path?.toString() === item.link ? "active" : ""
              }`}
              key={index}
            >
              <Link href={item.link} className="flex gap-5 items-center ">
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
