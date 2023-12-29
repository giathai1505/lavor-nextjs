import { AiFillCar, AiOutlineCar } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { BiNews } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone, FaRegStar } from "react-icons/fa";
import {
  FaEarthAmericas,
  FaLocationDot,
  FaSquareFacebook,
} from "react-icons/fa6";

import image1 from "@/assets/images/youtubeThumbnail/home/vf8.webp";
import image2 from "@/assets/images/youtubeThumbnail/home/mt.webp";
import image3 from "@/assets/images/youtubeThumbnail/home/3.webp";

//carousel slider images
import gallery1 from "@/assets/images/home-slider/home-slider5.webp";
import gallery2 from "@/assets/images/home-slider/home-slider6.webp";
import gallery3 from "@/assets/images/home-slider/home-slider7.webp";

import productThumbnail1 from "@/assets/images/youtubeThumbnail/products/1.webp";
import productThumbnail2 from "@/assets/images/youtubeThumbnail/products/2.webp";
import productThumbnail3 from "@/assets/images/youtubeThumbnail/products/3.webp";
import productThumbnail4 from "@/assets/images/youtubeThumbnail/products/4.webp";
import productThumbnail5 from "@/assets/images/youtubeThumbnail/products/5.webp";
import productThumbnail6 from "@/assets/images/youtubeThumbnail/products/6.webp";
import { ProductType } from "@/types/type";

import bocGheImg from "@/assets/images/cateogries/boc-ghe-category.png";
import goiLungImg from "@/assets/images/cateogries/goi-lung-category.png";
import goiCoImg from "@/assets/images/cateogries/goi-co-category.png";
import thamLotSanImg from "@/assets/images/cateogries/tham-lot-san-category.png";
import voLangImg from "@/assets/images/cateogries/boc-vo-lang-category.webp";
import sanPhamKhacImg from "@/assets/images/cateogries/san-pham-khac.png";

//category image
import bocGheImg1 from "@/assets/images/cateogries/boc-ghe-img.jpeg";
import goiCoImg1 from "@/assets/images/cateogries/goi-co-img.png";
import thamLotSanImg1 from "@/assets/images/cateogries/tham-lot-san-img.png";
import voLangImg1 from "@/assets/images/cateogries/boc-tay-lai-img.jpeg";
import goiLung1 from "@/assets/images/cateogries/goi-lung.jpeg";

import Link from "next/link";
import { webRouter } from "@/constants/constants";

export const AdminSidebarCategories = [
  {
    id: 1,
    name: "Quản lý car",
    icon: <AiOutlineCar />,
    link: "/admin/car-management",
  },
  {
    id: 2,
    name: "Sản phẩm",
    icon: <AiFillCar />,
    link: "/admin/product-management",
  },
  {
    id: 3,
    name: "Bài viết",
    icon: <BiNews />,
    link: "/admin/blog-management",
  },
  {
    id: 5,
    name: "Đại lý",
    icon: <CiLocationOn className="text-white" />,
    link: "/admin/agency-management",
  },

  {
    id: 6,
    name: "Đánh giá",
    icon: <FaRegStar />,
    link: "/admin/rating-management",
  },
];

export const AdminSiderMenuData = [
  {
    key: "1",
    icon: <AiOutlineCar />,
    label: <Link href={webRouter.admin.CAR_MANAGEMENT}>Quản lý xe</Link>,
  },
  {
    key: "2",
    icon: <AiFillCar />,
    label: <Link href={webRouter.admin.PRODUCT_MANAGEMENT}>Sản phẩm</Link>,
  },

  {
    key: "3",
    icon: <BiNews />,
    label: <Link href={webRouter.admin.BLOG_MANAGEMENT}>Bài viết</Link>,
  },

  {
    key: "4",
    icon: <SlLocationPin />,
    label: <Link href={webRouter.admin.AGENCY_MANAGEMENT}>Đại lý</Link>,
  },
  {
    key: "5",
    icon: <FaRegStar />,
    label: <Link href={webRouter.admin.REVIEW_MANAGEMENT}>Đánh giá</Link>,
  },
];

export const userFooterData = [
  {
    id: 1,
    name: "NỘI THẤT Ô TÔ LAVOR",
    hasMedia: true,
    child: [
      {
        id: 11,
        name: "Địa chỉ: Lô A1 KCN Dương Liễu, Hoài Đức, Hà Nội",
        slug: "/",
        icon: <FaLocationDot />,
      },

      {
        id: 12,
        name: "Chi nhánh miền nam: 33 Đường 29, Khu Đô Thị Vạn Phúc, Thủ Đức, Hồ Chí Minh",
        slug: "/",
        icon: <FaLocationDot />,
      },
      {
        id: 13,
        name: "1900 234 556",
        slug: "/",
        icon: <FaPhone />,
      },
      {
        id: 15,
        name: "Website: Lavorluxury.com",
        slug: "/",
        icon: <FaEarthAmericas />,
      },
      {
        id: 16,
        name: "Fanpage: Lavor luxury",
        slug: "/",
        icon: <FaSquareFacebook />,
      },
      {
        id: 17,
        name: "info@minhtamvietnam.com",
        slug: "/",
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
        name: "Bọc ghế da",
        slug: "/",
        icon: <></>,
      },
      {
        id: 22,
        name: "Gối cổ",
        slug: "/",
        icon: <></>,
      },
      {
        id: 23,
        name: "Gối Lưng",
        slug: "/",
        icon: <></>,
      },
      {
        id: 24,
        name: "Bọc tay lái",
        slug: "/",
        icon: <></>,
      },
      {
        id: 25,
        name: "Thảm lót sàn ô tô",
        slug: "/",
        icon: <></>,
      },
      {
        id: 26,
        name: "Sản phẩm khác",
        slug: "/",
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
        slug: "/",
        icon: <></>,
      },
      {
        id: 32,
        name: "Chính đổi trả và hoàn tiền",
        slug: "/",
        icon: <></>,
      },
      {
        id: 33,
        name: "Chính sách xử lý khiếu nại",
        slug: "/",
        icon: <></>,
      },
      {
        id: 34,
        name: "Chính sách vận chuyển và giao nhận",
        slug: "/",
        icon: <></>,
      },
      {
        id: 35,
        name: "Chính sách kiểm hàng",
        slug: "/",
        icon: <></>,
      },
      {
        id: 36,
        name: "Chính sách bảo hành",
        slug: "/",
        icon: <></>,
      },
      {
        id: 37,
        name: "Chính sách bảo mật thông tin",
        slug: "/",
        icon: <></>,
      },
    ],
  },
];

export const userNavbarData = [
  {
    id: 1,
    name: "Nội thất thiết kế riêng của bạn",
    slug: "/thiet-ke",
    children: [],
  },
  {
    id: 2,
    name: "Về Lavor",
    slug: "/ve-chung-toi",
    children: [],
  },
  {
    id: 3,
    name: "Sản phẩm",
    slug: "/san-pham",
    children: [
      {
        id: 31,
        name: "Bọc ghế da",
        slug: "/san-pham/boc-ghe-da",
      },
      {
        id: 32,
        name: "Gối cổ",
        slug: "/san-pham/goi-co",
      },
      {
        id: 33,
        name: "Gối lưng",
        slug: "/san-pham/goi-co",
      },
      {
        id: 34,
        name: "Bọc tay lái",
        slug: "/san-pham/boc-tay-lai",
      },

      {
        id: 35,
        name: "Thảm lót sàn",
        slug: "/san-pham/tham-lot-san",
      },
      {
        id: 36,
        name: "Sản phẩm khác",
        slug: "/san-pham/san-pham-khac",
      },
    ],
  },
  {
    id: 4,
    name: "Đại lý",
    slug: "/dai-ly",
    children: [],
  },
  {
    id: 5,
    name: "Tin tức",
    slug: "/tin-tuc",
    children: [
      {
        id: 51,
        name: "Kiến thức & mẹo",
        slug: "/tin-tuc?view=grid&page=1&pageSize=2&category=TIPS",
      },
      {
        id: 52,
        name: "Về Lavor",
        slug: "/tin-tuc?view=grid&page=1&pageSize=2&category=ABOUT",
      },
      {
        id: 53,
        name: "Tuyển dụng",
        slug: "/tin-tuc?view=grid&page=1&pageSize=2&category=RECRUITMENT",
      },
    ],
  },
  {
    id: 6,
    name: "Liên hệ",
    slug: "/lien-he",
    children: [],
  },
];

export const amazingCar = [
  {
    id: 1,
    alt: "Lột xác VF8",
    src: image1,
    link: "https://www.youtube.com/watch?v=nV7IIKJYZik",
    title: `Hành trình "lột xác" cho Vinfast VF8 | Lavor Luxury`,
  },
  {
    id: 2,
    alt: "Camry 7 năm tuổi lột xác",
    src: image2,
    link: "https://www.youtube.com/watch?v=k0mTEmHOtqw",
    title:
      'Lavor ĐỒNG HÀNH cùng MT Luxury "LỘT XÁC" Peugeot Traveller Luxury | Lavor Laxury',
  },
  {
    id: 3,
    alt: "Ford Everest lột xác",
    src: image3,
    link: "https://www.youtube.com/watch?v=KqFnFYv-DLk",
    title:
      'HOT!!! FORD EVEREST NEXT GEN bọc lại nội thất "chủ tịch" siêu VIP | Lavor Luxury',
  },
];

export const carouseSliderImages = [gallery2, gallery1, gallery3];

export const bocGheDa = [
  {
    id: 1,
    name: "VINFAST LUX SA",
    videoThumbnail: {
      image: productThumbnail1,
      title:
        "Biến hình VINFAST LUX SA với nội thất tone sur tone | Lavor Luxury",
      url: "https://www.youtube.com/watch?v=o94cR8g0QvM",
      alt: "Biến hình VINFAST LUX SA",
    },
  },
  {
    id: 2,
    name: "LEXUS RX 350 2023",
    videoThumbnail: {
      image: productThumbnail2,
      title:
        "HOT !!! LEXUS RX 350 2023 lắp đặt bộ sản phẩm Sàn 360 và Thảm lót chân ô tô Lavor",
      url: "https://www.youtube.com/watch?v=o94cR8g0QvM",
      alt: "LEXUS RX 350 2023",
    },
  },
  {
    id: 3,
    name: "Roll-Royce Phantom 2006",
    videoThumbnail: {
      image: productThumbnail3,
      title:
        "Roll-Royce Phantom 2006 '' LỘT XÁC '' hoàn toàn màu cực đỉnh Hermes Siêu Độc | Lavor",
      url: "https://www.youtube.com/watch?v=y50Bq7FMKrM",
      alt: "Roll-Royce Phantom 2006",
    },
    videoURL: "https://www.youtube.com/watch?v=nV7IIKJYZik",
  },
  {
    id: 4,
    name: "Peugeot Traveller Luxury",
    videoThumbnail: {
      image: productThumbnail4,
      title:
        "Lavor ĐỒNG HÀNH cùng MT Luxury LỘT XÁC Peugeot Traveller Luxury | Lavor Laxury",
      url: "https://www.youtube.com/watch?v=xGGOYmIsUvY",
      alt: "Peugeot Traveller Luxury",
    },
  },
  {
    id: 5,
    name: "Mercedes GLS 450",
    videoThumbnail: {
      image: productThumbnail5,
      title:
        "Nệm ghế da Mercedes GLS 450 Lavor thiết kế siêu đẹp | LAVOR LUXURY |",
      url: "https://www.youtube.com/watch?v=4Ve7LJJbbPI",
      alt: "Mercedes GLS 450 ",
    },
  },
  {
    id: 6,
    name: "Vinfast Lux Tubo 2.0",
    videoThumbnail: {
      image: productThumbnail6,
      title:
        "Hoá phép nội thất Vinfast Lux A 2.0 thành nội thất Maybach S | Lavor Luxury |",
      url: "https://www.youtube.com/watch?v=chOKemxoKBk",
      alt: "Vinfast Lux A 2.0",
    },
  },
];

export const categories = [
  {
    id: ProductType.CHAIR,
    name: "Bọc ghế da",
    image: bocGheImg,
    href: "/san-pham/boc-ghe-da",
    quantity: 9,
    icon: bocGheImg1,
    desc: "Sử dụng chất liệu da cao cấp giúp bảo vệ thân ghế, chống bám bẩn, chống bám bụi, chống ám mùi, an toàn cho sức khỏe. Đem lại hiệu quả thẩm mỹ cao, thể hiện sự Sang trọng – Đẳng cấp – Cá tính.",
  },

  {
    id: ProductType.PILLOW,
    name: "Gối cổ",
    image: goiCoImg,
    href: "/san-pham/goi-co",
    quantity: 27,
    icon: goiCoImg1,
    desc: "Giúp người lái xe có thể tựa và giữ cổ vai thoải mái, giảm mỏi cổ vai và không bị nghiêng người mỗi lúc xe vào cua. Gối được làm từ chất liệu da cao cấp, chống mồ hôi, êm ái, không chất độc hại.",
  },
  {
    id: "GOI_LUNG",
    name: "Gối lưng",
    image: goiLungImg,
    href: "/san-pham/goi-lung",
    quantity: 9,
    icon: goiLung1,
    desc: "Sử dụng chất liệu da cao cấp giúp bảo vệ thân ghế, chống bám bẩn, chống bám bụi, chống ám mùi, an toàn cho sức khỏe. Đem lại hiệu quả thẩm mỹ cao, thể hiện sự Sang trọng – Đẳng cấp – Cá tính.",
  },
  {
    id: ProductType.STEERING_WHEEL,
    name: "Bọc tay lái",
    image: voLangImg,
    href: "/san-pham/boc-tay-lai",
    quantity: 9,
    icon: voLangImg1,
    desc: "Làm từ chất liệu da cao cấp. Thiết kế các lỗ thoáng khí giúp thấm mồ hôi, không còn cảm giác dớp dính khi lái xe. Cam kết chất lượng tốt nhất trên thị trường, mang đến trải nghiệm tuyệt vời cho khách hàng.",
  },
  {
    id: ProductType.FLOOR,
    name: "Thảm lót sàn",
    image: thamLotSanImg,
    href: "/san-pham/tham-lot-san",
    quantity: 6,
    icon: thamLotSanImg1,
    desc: "Thiết kế hiện đại, sang trọng, đảm bảo che phủ toàn bộ phần sàn xe.. Ngăn ngừa tuyệt đối bụi bẩn và chất lỏng lọt xuống sàn xe gây mốc sàn và bốc mùi khó chịu. Chống trầy xước, chịu nhiệt tốt, độ bền cao.",
  },
  {
    id: ProductType.OTHER,
    name: "Sản phẩm khác",
    image: sanPhamKhacImg,
    href: "/san-pham/san-pham-khac",
    quantity: 1,
    icon: bocGheImg1,
    desc: "",
  },
];

export const SocialMediaLink = {
  facebook: "https://www.facebook.com/LavorLuxury2",
  tiktok: "https://www.tiktok.com/@lavorluxury.official",
  youtube: "https://www.youtube.com/@LavorLuxury",
  messenger: "https://m.me/LavorLuxury2",
  phone: "tel:1900234556",
};
