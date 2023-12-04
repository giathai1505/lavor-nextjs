import ComparisonSlider from "@/components/ComparisonSlider";
import Image from "next/image";
import Link from "next/link";
import startNowButton from "@/assets/images/start-now-button.png";
import "@/assets/styles/homepage.css";
import startButton from "@/assets/images/start-now-button.png";
import homeSlider from "@/assets/images/home-slider/home-slider3.jpeg";
import Button from "@/components/Common/Button";
import ProductPart from "./ProductPart";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import introduceImg from "@/assets/images/youtubeThumbnail/home/4.png";
import { amazingCar } from "@/data/homePage";
import { BsArrowDownCircleFill } from "react-icons/bs";
import HomeCarousel from "@/components/HomeCarousel";

export default function HomePage() {
  return (
    <div>
      <div className="home-img overflow-hidden">
        {/* <div className="home-arrow-down">
          <BsArrowDownCircleFill />
        </div> */}
        <div className="h-[80vh]">
          <HomeCarousel />
        </div>
        <div className="absolute home-text-wrapper left-0 z-10 top-[40%] hidden xl:block">
          <div className="home-text">
            <h3 className="relative pb-5 leading-10 text-2xl">
              <span className="font-bold">ĐẲNG CẤP HƠN VỚI LAVOR!</span>
            </h3>
            <p className="common-text">
              Bạn muốn nâng tầm, làm mới nội thất xe của mình?
            </p>
          </div>

          <Link href="/choose-your-design" className="relative mt-2">
            <Image
              alt="choose your design"
              src={startNowButton}
              className="start-button w-80"
            />
          </Link>
        </div>
      </div>

      <div className="home-leather py-5">
        <div className="container mx-auto max-w-[1200px] p-5 md:p-10">
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            Với <span>Lavor</span> , nội thất xe của bạn sẽ trở nên <br />
            <span> đẳng cấp</span>
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10">
            <div className="h-[200px] w-[350px] mx-auto mb-5 md:mb-10 md:h-[350px] md:w-[600px] xl:h-[300px] xl:w-[500px]">
              <YoutubeThumbnail
                imgAlt="Giới thiệu Lavor"
                imgSrc={introduceImg}
                link="https://www.youtube.com/watch?v=Q9CR65EpYZU"
                title="LAVOR LUXURY | Giới thiệu công ty TNHH Thương Mại Dịch Vụ Và Sản Xuất Minh Tâm"
              />
            </div>
            <div className="leather-text">
              <p className="mb-5 text-justify md:mb-10 xl:text-left">
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
                Qua hơn 10 năm xây dựng và phát triển, trên 1.000 chủng loại sản
                phẩm được sản xuất với sản lượng 300.000 sản phẩm/năm, Lavor
                đang dần khẳng định vị thế của mình trên thị trường. "
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button link="/about-us" text="Tìm hiểu thêm" />
          </div>
        </div>
      </div>

      <ComparisonSlider />

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
            </div>{" "}
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
            <Link href="/choose-your-design">
              <Image
                src={startButton}
                alt="Chọn thiêt kế riêng cuả bạn"
                className="w-80 start-button"
              />
            </Link>
          </div>
        </div>
      </div>

      <ProductPart />

      <div className="bg-secondaryBackground py-10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-5 text-xl leading-8 md:text-2xl md:leading-10 md:mb-10 xl:text-3xl xl:leading-[48px]">
            NHỮNG <span>TUYỆT PHẨM</span> ĐƯỢC NÂNG CẤP TẠI <span>LAVOR</span>
          </h2>
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-3 xl:my-20">
            {amazingCar.map((item) => {
              return (
                <div
                  className="h-[200px] w-[350px] mx-auto md:h-[350px] md:w-[600px] xl:w-[350px] xl:h-[200px]"
                  key={item.id}
                >
                  <YoutubeThumbnail
                    imgAlt={item.alt}
                    imgSrc={item.src}
                    link={item.link}
                    title={item.title}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/choose-your-design">
              <Image
                src={startButton}
                alt="Chọn thiêt kế riêng cuả bạn"
                className="w-80 start-button"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
