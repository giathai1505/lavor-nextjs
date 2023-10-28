import {
  AiFillCar,
  AiOutlineCar,
  AiOutlineContacts,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { GrContact, GrLocation } from "react-icons/gr";

export const sidebarList = [
  {
    id: 1,
    name: "Quản lý car",
    icon: <AiOutlineCar />,
    link: "/admin/dashboard/car-management",
  },
  {
    id: 2,
    name: "Sản phẩm",
    icon: <AiFillCar />,
    link: "/admin/dashboard/product-management",
  },
  {
    id: 3,
    name: "Bài viết",
    icon: <BiNews />,
    link: "/admin/dashboard/blog-management",
  },
  {
    id: 4,
    name: "Giỏ hàng",
    icon: <AiOutlineShoppingCart />,
    link: "/admin/dashboard/cart-management",
  },

  {
    id: 5,
    name: "Đại lý",
    icon: <CiLocationOn className="text-white" />,
    link: "/admin/dashboard/agency-management",
  },

  {
    id: 6,
    name: "Liên hệ",
    icon: <AiOutlineContacts />,
    link: "/admin/dashboard/contact-management",
  },
];
