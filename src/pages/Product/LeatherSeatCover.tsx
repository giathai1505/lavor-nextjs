import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import startButton from "@/assets/images/start-now-button.png";
import { bocGheDa } from "./data";

const LeatherSeatCover = () => {
  return (
    <div>
      <h2>Boc Ghe Da</h2>
      <p className="m-0 mb-20 text-xl text-primary text-center">
        Sơ đồ cấu trúc Website Lavor 100% C7 Dưới đây là một số mẫu bọc ghế da
        đã được thực hiện tại Lavor. Các bạn có thể tham khảo để dễ dàng tạo ra
        thiết kế cho riêng mình nhé!
      </p>
      <div className="grid grid-cols-3 gap-20">
        {bocGheDa.map((item) => {
          return (
            <div>
              <div>
                <iframe
                  src="https://www.youtube.com/embed/ZlZ7Cq8AQBU"
                  title="Hướng dẫn lắp đặt bộ MASSAGE LAVOR 3 CHỨC NĂNG"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full h-[200px]"
                ></iframe>
              </div>
              <p className="uppercase text-center text-primary mt-2 text-xl">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <Button link="" text="Xem them"></Button>
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
  );
};

export default LeatherSeatCover;
