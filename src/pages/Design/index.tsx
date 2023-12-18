"use client";
import ProgressBar from "@/components/ProgressBar";
import React, { useMemo, useState } from "react";
import ChooseCar from "./ChooseCar";
import ChooseDesign from "./ChooseDesign";
import Conclusion from "./Conclusion";
import Link from "next/link";
import Image from "next/image";
import startButton from "@/assets/images/start-now-button.png";
import Button from "@/components/Common/Button";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/7.jpeg";

import introduceImg from "@/assets/images/youtubeThumbnail/home/4.png";
import YoutubeThumbnail from "@/components/Common/YoutubeThumbnail";
import { IBrand, IYear } from "@/types/type";

interface IPageProps {
  brands: IBrand[];
  years: IYear[];
}

type TOption = {
  id: number;
  value: string;
};

export type TCar = {
  year: TOption | undefined;
  brand: TOption | undefined;
  model: TOption | undefined;
  version: TOption | undefined;
  image: string;
};

export type TDesign = {
  materialID: number | undefined;
  colorID: string | undefined;
  holeID: string | undefined;
  note: string;
};

type TDesignData = {
  car: TCar;
  design: TDesign;
  phoneNumber: string;
};

const Design: React.FC<IPageProps> = ({ brands, years }) => {
  const [phase, setPhase] = useState<number>(1);

  const [designData, setDesignData] = useState<TDesignData>({
    car: {
      brand: undefined,
      model: undefined,
      version: undefined,
      year: undefined,
      image: "",
    },
    design: {
      materialID: undefined,
      colorID: undefined,
      holeID: undefined,
      note: "",
    },
    phoneNumber: "",
  });

  const handleDesignDataChange = (phase: number, data: any) => {
    let newData;
    switch (phase) {
      case 1:
        newData = {
          ...designData,
          car: structuredClone(data),
        };
        setPhase(2);

        break;
      case 2:
        newData = {
          ...designData,
          design: structuredClone(data),
        };
        setPhase(3);

        break;
      case 3:
        newData = {
          ...designData,
          phoneNumber: structuredClone(data),
        };
        //handle submit tai day

        break;
      default:
        break;
    }

    setDesignData(newData as TDesignData);
  };

  const renderPhase = useMemo(() => {
    let phaseComponent;
    switch (phase) {
      case 1:
        phaseComponent = (
          <ChooseCar
            onNext={(data: any) => handleDesignDataChange(1, data)}
            brands={brands}
            years={years}
            data={designData.car}
          />
        );

        break;
      case 2:
        phaseComponent = (
          <ChooseDesign
            onNext={(data: any) => handleDesignDataChange(2, data)}
            data={designData.design}
            onPrevious={() => setPhase(1)}
          />
        );

        break;
      case 3:
        phaseComponent = (
          <Conclusion
            onPrevious={() => setPhase(2)}
            onComplete={(data: any) => handleDesignDataChange(3, data)}
            designData={designData}
          />
        );

        break;

      default:
        phaseComponent = (
          <ChooseCar
            brands={brands}
            years={years}
            onNext={(data: any) => handleDesignDataChange(1, data)}
            data={designData.car}
          />
        );
        break;
    }
    return phaseComponent;
  }, [phase, brands, years]);
  return (
    <div className="design-wrapper">
      <PartHeader
        breadcrumb="Chọn thiết kế"
        title="NỘI THẤT THIẾT KẾ RIÊNG CỦA BẠN"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black pt-20">
        <div className="wrapper">
          <div className="flex justify-center mb-20">
            <ProgressBar active={phase} />
          </div>
          <div className="pb-10 md:pb-20 xl:pb-40">{renderPhase}</div>
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
                Qua hơn 15 năm xây dựng và phát triển, trên 1.000 chủng loại sản
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
    </div>
  );
};

export default Design;
