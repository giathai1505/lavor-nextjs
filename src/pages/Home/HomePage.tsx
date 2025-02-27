import Link from "next/link";
import startButton from "@/assets/images/common/start-now-button.webp";
import Button from "@/components/Common/Button";
import introduceImg from "@/assets/images/common/home-part2.webp";
import HomeCarousel from "@/components/HomeCarousel";
import { IProduct } from "@/types/type";
import React from "react";
import dynamic from "next/dynamic";
import { indexArray } from "@/utilities/commonUtilities";

const LazyComparisonSlider = dynamic(
  () => import("@/components/ComparisonSlider"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const LazyProductPart = dynamic(() => import("./ProductPart"), {
  loading: () => <p>Loading...</p>,
});

const LazySimpleVideo = dynamic(() => import("./SampleVideos"), {
  loading: () => <p>Loading...</p>,
});

type IPageProps = {
  products: IProduct[];
};

const HomePage: React.FC<IPageProps> = ({ products }) => {
  return (
    <div>
      <div className="home-img overflow-hidden">
        <div className="h-[280px] md:h-[800px] xl:h-[90vh]">
          <HomeCarousel />
        </div>
      </div>

      <div className="home-leather py-5">
        <div className="container mx-auto max-w-[1320px] p-5 md:p-10 xl:px-0 xl:py-16">
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            Với <span>Lavor</span> , nội thất xe của bạn sẽ trở nên <br />
            <span> đẳng cấp</span>
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10">
            <div className=" mx-auto mb-5 md:mb-10">
              <img
                alt="Công xưởng Lavor"
                src={introduceImg.src}
                loading="eager"
                width="500"
                height="333"
                decoding="async"
                data-nimg="1"
                className="rounded-xl border-[6px] border-solid border-primary xl:h-[300px] h-[200px] md:h-[350px] md:w-[600px] w-[350px] xl:w-[500px] object-cover"
              />
            </div>
            <div className="leather-text text:base md:text-lg">
              <p className="mb-5  text-justify md:mb-10 xl:text-left">
                Hãy tưởng tượng nội thất xe của bạn được bọc da sang trọng, nâng
                cấp hiện đại và mang phong cách của riêng bạn. Có thể bạn muốn
                điều đó nhưng lại lo lắng về chất lượng ở các Garage. Hoặc bạn
                đang cảm thấy khó khăn khi muốn chiếc ghế da mang phong cách cá
                nhân của mình trở nên thông minh và hữu ích hơn nữa. Dù mong
                muốn của bạn là gì, Lavor cũng có thể thực hiện nó, tăng thêm sự
                sang trọng, tiện nghi và phong cách cho chiếc xe của bạn.
              </p>

              <p className="text-justify xl:text-left">
                Lavor là một thương hiệu sản xuất nội thất ô tô, trực thuộc Công
                ty TNHH TMDV & SX Minh Tâm – chuyên gia trong lĩnh vực sản xuất
                nội thất, độ xe và dịch vụ lắp đặt nội thất ô tô tại Việt Nam.
                Qua hơn 15 năm xây dựng và phát triển, trên 1.000 chủng loại sản
                phẩm được sản xuất với sản lượng 300.000 sản phẩm/năm, Lavor
                đang dần khẳng định vị thế của mình trên thị trường. "
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button link="/ve-chung-toi" text="Tìm hiểu thêm" />
          </div>
        </div>
      </div>

      <LazyComparisonSlider />

      <div className="bg-secondaryBackground p-10 xl:p-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            CHỌN CHIẾC XE CỦA BẠN - CÒN LẠI <span>LAVOR </span> LO
          </h2>
          <div className="grid grid-cols-1 gap-5 mb-5 xl:grid-cols-3 xl:gap-10 xl:my-20">
            <div className="flex gap-5 text-left">
              <p className="p3-big-text phone">1.</p>
              <div>
                <h3>CHỌN THIẾT KẾ CỦA RIÊNG BẠN</h3>
                <p className="text-white mt-4 font-light">
                  Bạn chỉ cần tìm chiếc xe của mình bằng cách chọn năm sản xuất,
                  hãng xe, dòng xe sau đó nhấn tiếp tục để chọn thiết kế riêng
                  của bạn.
                </p>
              </div>
            </div>
            <div className="flex gap-5 text-left font-light">
              <p className="p3-big-text phone">2.</p>
              <div>
                <h3>LAVOR LÊN LỊCH NÂNG CẤP NỘI THẤT XE GIÚP BẠN</h3>
                <p className="text-white mt-4">
                  Hãy để lại thông tin liên hệ. Những chuyên viên của Lavor sẽ
                  tư vấn cụ thể hơn và lên lịch nâng cấp nội thất xe giúp bạn.
                </p>
              </div>
            </div>
            <div className="flex gap-5 text-left font-light">
              <p className="p3-big-text phone">3.</p>
              <div>
                <h3>LAVOR NÂNG CẤP NỘI THẤT XE GIÚP BẠN</h3>
                <p className="text-white mt-4">
                  Lavor sẽ tiến hành nâng cấp nội thất xe và mang đến bất ngờ
                  cho bạn.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/thiet-ke">
              <img
                src={startButton.src}
                loading="lazy"
                width="489"
                height="160"
                decoding="async"
                data-nimg="1"
                alt="Chọn thiêt kế riêng cuả bạn"
                className="w-80 start-button"
              />
            </Link>
          </div>
        </div>
      </div>

      <LazyProductPart products={products} />

      <LazySimpleVideo />
    </div>
  );
};

export default HomePage;
