import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import startButton from "@/assets/images/common/start-now-button.webp";

const DesignStaticPart3 = () => {
  return (

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
            <Link href="/thiet-ke">
              <Image
                src={startButton}
                alt="Chọn thiêt kế riêng cuả bạn"
                className="w-80 start-button"
              />
            </Link>
          </div>
        </div>
      </div>

  )
}

export default DesignStaticPart3