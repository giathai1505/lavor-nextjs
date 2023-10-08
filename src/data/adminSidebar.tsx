import { AiFillCar, AiOutlineCar, AiOutlineShoppingCart } from "react-icons/ai";
import { BiNews } from "react-icons/bi";

export const sidebarList = [
  {
    id: 1,
    name: "Quản lý car",
    icon: <AiOutlineCar />,
    link: "",
  },
  {
    id: 2,
    name: "Sản phẩm",
    icon: <AiFillCar />,
    link: "",
  },
  {
    id: 1,
    name: "Bài viết",
    icon: <BiNews />,
    link: "/admin/dashboard/blog-management",
  },
  {
    id: 1,
    name: "Giỏ hàng",
    icon: <AiOutlineShoppingCart />,
    link: "",
  },
];
