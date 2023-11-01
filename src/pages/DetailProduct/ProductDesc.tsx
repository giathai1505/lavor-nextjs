import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import React from "react";
import goiCoImg from "@/assets/images/youtubeThumbnail/products/goico.jpeg";

const ProductDesc = () => {
  return (
    <div className="db-desc-wrapper text-white">
      <p className="text-3xl font-bold text-primary">Mô tả sản phẩm</p>
      <p className="text-2xl font-bold text-primary">Gối cổ Lavor Premium</p>
      <p className="leading-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="w-[500px] h-[300px] mx-auto">
        <YoutubeThumbnail
          imgAlt="Gối cổ cao cấp Lavor Premium"
          imgSrc={goiCoImg}
          title="Gối cổ CAO CẤP Lavor Premium | Thoải mái trên mọi hành trình | Lavor Luxury"
          link="https://www.youtube.com/watch?v=WxabGfI3CVk"
        />
      </div>

      <p className="leading-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  );
};

export default ProductDesc;
