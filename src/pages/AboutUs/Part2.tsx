import Image from "next/image";
import Link from "next/link";
import React from "react";
import startButton from "@/assets/images/start-now-button.png";

const Part2 = () => {
  return (
    <div className="bg-[#2D2D2D] py-20">
      <div className="wrapper">
        <h2>
          Chọn chiếc xe của bạn - còn lại để <span>Lavor</span> lo
        </h2>
        <div className="grid grid-cols-2 gap-10">
          <div className="text-white">
            <p>
              1. Bạn chỉ cần tìm chiếc xe của mình bằng cách chọn năm sản xuất,
              hãng xe, dòng xe sau đó nhấn tiếp tục để chọn thiết kế riêng của
              bạn.
            </p>
            <br />
            <p>
              2. Hãy để lại thông tin liên hệ. Những chuyên viên của Lavor sẽ
              liên hệ với bạn để tư vấn cụ thể hơn về thiết kế cũng như giá và
              lên lịch nâng cấp nội thất xe giúp bạn.{" "}
            </p>
            <br />
            <p>
              3. Lavor sẽ tiến hành nâng cấp nội thất xe và mang đến bất ngờ cho
              bạn
            </p>
          </div>
          <div>
            <iframe
              src="https://www.youtube.com/embed/ZlZ7Cq8AQBU"
              title="Hướng dẫn lắp đặt bộ MASSAGE LAVOR 3 CHỨC NĂNG"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-[300px]"
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
  );
};

export default Part2;
