import {
  FaEarthAmericas,
  FaLocationDot,
  FaPhone,
  FaSquareFacebook,
} from "react-icons/fa6";
import { CgMail } from "react-icons/cg";

export const footerData = [
  {
    id: 1,
    name: "NỘI THẤT Ô TÔ LAVOR",
    hasMedia: true,
    child: [
      {
        id: 11,
        name: "Địa chỉ: Lô A1 KCN Dương Liễu, Hoài Đức, Hà Nội",
        slug: "",
        icon: <FaLocationDot />,
      },

      {
        id: 12,
        name: "Chi nhánh miền nam: 33 Đường 29, Khu Đô Thị Vạn Phúc, Thủ Đức, Hồ Chí Minh",
        slug: "",
        icon: <FaLocationDot />,
      },
      {
        id: 13,
        name: "1900 234 556",
        slug: "",
        icon: <FaPhone />,
      },
      {
        id: 15,
        name: "Website: Lavorluxury.com",
        slug: "",
        icon: <FaEarthAmericas />,
      },
      {
        id: 16,
        name: "Fanpage: Lavor luxury",
        slug: "",
        icon: <FaSquareFacebook />,
      },
      {
        id: 17,
        name: "info@minhtamvietnam.com",
        slug: "",
        icon: <CgMail />,
      },
    ],
  },
  {
    id: 2,
    name: "Sản phẩm",
    hasMedia: false,
    child: [
      {
        id: 21,
        name: "Bọc ghế",
        slug: "",
        icon: <></>,
      },
      {
        id: 22,
        name: "Bọc tay lái",
        slug: "",
        icon: <></>,
      },
      {
        id: 23,
        name: "Gối cổ",
        slug: "",
        icon: <></>,
      },
      {
        id: 24,
        name: "Thảm lót sàn ô tô",
        slug: "",
        icon: <></>,
      },
      {
        id: 25,
        name: "Sản phẩm khác",
        slug: "",
        icon: <></>,
      },
    ],
  },
  {
    id: 3,
    name: "Chính sách",
    hasMedia: false,
    child: [
      {
        id: 31,
        name: "Chính sách thanh toán",
        slug: "",
        icon: <></>,
      },
      {
        id: 32,
        name: "Chính đổi trả và hoàn tiền",
        slug: "",
        icon: <></>,
      },
      {
        id: 33,
        name: "Chính sách xử lý khiếu nại",
        slug: "",
        icon: <></>,
      },
      {
        id: 34,
        name: "Chính sách vận chuyển và giao nhận",
        slug: "",
        icon: <></>,
      },
      {
        id: 35,
        name: "Chính sách kiểm hàng",
        slug: "",
        icon: <></>,
      },
      {
        id: 36,
        name: "Chính sách bảo hành",
        slug: "",
        icon: <></>,
      },
      {
        id: 37,
        name: "Chính sách bảo mật thông tin",
        slug: "",
        icon: <></>,
      },
    ],
  },
];
