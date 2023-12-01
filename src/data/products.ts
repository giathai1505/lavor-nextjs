import productThumbnail1 from "@/assets/images/youtubeThumbnail/products/1.webp";
import productThumbnail2 from "@/assets/images/youtubeThumbnail/products/2.webp";
import productThumbnail3 from "@/assets/images/youtubeThumbnail/products/3.webp";
import productThumbnail4 from "@/assets/images/youtubeThumbnail/products/4.webp";
import productThumbnail5 from "@/assets/images/youtubeThumbnail/products/5.webp";
import productThumbnail6 from "@/assets/images/youtubeThumbnail/products/6.webp";

//category
//icon
import bocGheImg from "@/assets/images/cateogries/boc-ghe.png";
import goiCoImg from "@/assets/images/cateogries/goi-co.png";
import thamLotSanImg from "@/assets/images/cateogries/tham-lot-san.png";
import voLangImg from "@/assets/images/cateogries/vo-lang.png";
import sanPhamKhacImg from "@/assets/images/cateogries/san-pham-khac.png";

//category image
import bocGheImg1 from "@/assets/images/cateogries/boc-ghe-img.jpeg";
import goiCoImg1 from "@/assets/images/cateogries/goi-co-img.png";
import thamLotSanImg1 from "@/assets/images/cateogries/tham-lot-san-img.png";
import voLangImg1 from "@/assets/images/cateogries/boc-tay-lai-img.jpeg";

//tham-lot-san
import thamLotSan1 from "@/assets/images/products/tham-lot-san/TLS-1.png";
import thamLotSan2 from "@/assets/images/products/tham-lot-san/TLS-2.png";
import thamLotSan3 from "@/assets/images/products/tham-lot-san/TLS-3.png";

//boc-tay-lai
import bocTayLai1 from "@/assets/images/products/boc-tay-lai/BTL-1.png";
import bocTayLai2 from "@/assets/images/products/boc-tay-lai/BTL-2.png";
import bocTayLai3 from "@/assets/images/products/boc-tay-lai/BTL-3.png";

//san-pham-khac
import sanPhamKhac1 from "@/assets/images/products/san-pham-khac/SPK-1.jpeg";
import { ProductType } from "@/types";

export const products = [
  {
    id: 1,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/20.png",
  },
  {
    id: 2,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/18.png",
  },
  {
    id: 3,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/16.png",
  },
  {
    id: 4,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/13.png",
  },
  {
    id: 5,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/11.png",
  },
  {
    id: 6,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/9.png",
  },
  {
    id: 7,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/7.png",
  },
  {
    id: 8,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/5.png",
  },
  {
    id: 9,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/20.png",
  },
  {
    id: 10,
    name: "Gối cổ premium-1-1",
    price: "1.599.000Đ",
    image: "https://lavorluxury.com/wp-content/uploads/2022/10/18.png",
  },
];

export const bocTayLai = [
  {
    id: 1,
    name: "Premium-1-03",
    price: "699.000",
    image: bocTayLai1,
    category: "Bọc tay lái",
  },
  {
    id: 2,
    name: "Anta – 01",
    price: "699.000",
    image: bocTayLai2,
    category: "Bọc tay lái",
  },
  {
    id: 3,
    name: "Premium-1-01",
    price: "699.000",
    image: bocTayLai3,
    category: "Bọc tay lái",
  },
];

export const thamLotSan = [
  {
    id: 1,
    name: "HYUNDAI TUCSON 2019",
    price: "999.000",
    image: thamLotSan1,
    category: "Thảm lót sàn",
  },
  {
    id: 2,
    name: "TOYOTA LAND CRUISER",
    price: "999.000",
    image: thamLotSan2,
    category: "Thảm lót sàn",
  },
  {
    id: 3,
    name: "HYUNDAI SANTAFE 2021",
    price: "999.000",
    image: thamLotSan3,
    category: "Thảm lót sàn",
  },
];

export const sanPhamKhac = [
  {
    id: 1,
    name: "Ví da Lavor",
    price: "499.000",
    image: sanPhamKhac1,
    category: "Sản phẩm khác",
  },
];

export const categories = [
  {
    id: ProductType.CHAIR,
    name: "Bọc ghế",
    image: bocGheImg,
    href: "/san-pham/boc-ghe-da",
    quantity: 9,
    icon: bocGheImg1,
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
    id: ProductType.PILLOW,
    name: "Gối cổ",
    image: goiCoImg,
    href: "/san-pham/goi-co",
    quantity: 27,
    icon: goiCoImg1,
    desc: "Giúp người lái xe có thể tựa và giữ cổ vai thoải mái, giảm mỏi cổ vai và không bị nghiêng người mỗi lúc xe vào cua. Gối được làm từ chất liệu da cao cấp, chống mồ hôi, êm ái, không chất độc hại.",
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
