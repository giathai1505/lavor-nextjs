import ComparisonSlider from "@/components/ComparisonSlider";
import Image from "next/image";
import Link from "next/link";
import startNowButton from "@/assets/images/start-now-button.png";
import "@/assets/styles/homepage.css";
import startButton from "@/assets/images/start-now-button.png";
import homeSlider from "@/assets/images/home-slider/home-slider3.jpeg";
import car from "@/assets/images/home-slider/home-slider2.jpeg";
import Button from "@/components/Common/Button";
import ProductPart from "./ProductPart";

export default function HomePage() {
  return (
    <div>
      <div className="home-img overflow-hidden">
        <Image src={homeSlider} alt="home image" />
        <div className="absolute home-text-wrapper left-0 z-10 top-[50%]">
          <div className="home-text">
            <h3 className="relative pb-5 leading-10 text-2xl">
              <span className="font-bold">ĐẲNG CẤP HƠN VỚI LAVOR!</span>
            </h3>
            <p className="common-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
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

      <div className="home-leather ">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="mb-10">
            Với <span>Lavor</span> , nội thất xe của bạn sẽ trở nên{" "}
            <span> đẳng cấp</span>
          </h2>
          <div className="grid grid-cols-2 gap-20">
            <div>
              <Image alt="oto" src={car} className="w-full rounded-md" />
            </div>
            <div className="leather-text">
              <p>
                Hãy tưởng tượng nội thất xe của bạn được bọc da sang trọng, nâng
                cấp hiện đại và mang phong cách của riêng bạn. Có thể bạn muốn
                điều đó nhưng lại lo lắng về chất lượng ở các Garage. Hoặc bạn
                đang cảm thấy khó khăn khi muốn chiếc ghế da mang phong cách cá
                nhân của mình trở nên thông minh và hữu ích hơn nữa. Dù mong
                muốn của bạn là gì, Lavor cũng có thể thực hiện nó, tăng thêm sự
                sang trọng, tiện nghi và phong cách cho chiếc xe của bạn.
              </p>

              <p>
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
            <Button link="" text="Tìm hiểu thêm" />
          </div>
        </div>
      </div>

      <ComparisonSlider />

      <div className="bg-[#2D2D2D]">
        <div className="max-w-[1200px] mx-auto text-center py-10">
          <h2 className="mb-10">
            CHỌN CHIẾC XE CỦA BẠN - CÒN LẠI <span>LAVOR </span> LO
          </h2>
          <div className="grid grid-cols-3 gap-20 mb-10">
            <div className="flex gap-10 text-left">
              <p className="p3-big-text">1.</p>
              <div>
                <h3>CHỌN THIẾT KẾ CỦA RIÊNG BẠN</h3>
                <p className="text-white mt-4 font-light">
                  Bạn chỉ cần tìm chiếc xe của mình bằng cách chọn năm sản xuất,
                  hãng xe, dòng xe sau đó nhấn tiếp tục để chọn thiết kế riêng
                  của bạn.
                </p>
              </div>
            </div>
            <div className="flex gap-10 text-left font-light">
              <p className="p3-big-text">2.</p>
              <div>
                <h3>LAVOR LÊN LỊCH NÂNG CẤP NỘI THẤT XE GIÚP BẠN</h3>
                <p className="text-white mt-4">
                  Hãy để lại thông tin liên hệ. Những chuyên viên của Lavor sẽ
                  tư vấn cụ thể hơn và lên lịch nâng cấp nội thất xe giúp bạn.
                </p>
              </div>
            </div>{" "}
            <div className="flex gap-10 text-left font-light">
              <p className="p3-big-text">3.</p>
              <div>
                <h3>LAVOR NÂNG CẤP NỘI THẤT XE GIÚP BẠN</h3>
                <p className="text-white mt-4">
                  Lavor sẽ tiến hành nâng cấp nội thất xe và mang đến bất ngờ
                  cho bạn.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <Link href="#">
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

      <div className="bg-[#2D2D2D] pb-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="py-10">
            NHỮNG <span>TUYỆT PHẨM</span> ĐƯỢC NÂNG CẤP TẠI <span>LAVOR</span>
          </h2>
          <div className="grid grid-cols-3 gap-10">
            <div>
              <iframe
                src="https://www.youtube.com/embed/jhebym6VHZ8"
                title='HOT!!! XE ĐỘ ÂM THANH 5000$ SẼ "LỘT XÁC" NHỮNG GÌ? | Lavor Luxury'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-[200px]"
              ></iframe>
            </div>
            <div>
              <iframe
                src="https://www.youtube.com/embed/k0mTEmHOtqw"
                title='CAMRY 7 năm tuổi "lột xác" như xe hạng SANG như thế nào? | Lavor Luxury'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-[200px]"
              ></iframe>
            </div>
            <div>
              <iframe
                width="1206"
                height="678"
                src="https://www.youtube.com/embed/KqFnFYv-DLk"
                title='HOT!!! FORD EVEREST NEXT GEN bọc lại nội thất "chủ tịch" siêu VIP | Lavor Luxury'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-[200px]"
              ></iframe>
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <Link href="#">
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
