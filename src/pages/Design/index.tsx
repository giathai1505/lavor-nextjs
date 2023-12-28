"use client";
import ProgressBar from "@/components/ProgressBar";
import React, { useMemo, useState } from "react";
import ChooseCar from "./ChooseCar";
import ChooseDesign from "./ChooseDesign";
import Conclusion from "./Conclusion";
import Link from "next/link";
import Image from "next/image";
import startButton from "@/assets/images/common/start-now-button.png";
import Button from "@/components/Common/Button";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/7.jpeg";
import introduceImg from "@/assets/images/common/home-part2.webp";
import { EDesignPhase, IBrand, IYear } from "@/types/type";

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
  const [phase, setPhase] = useState<EDesignPhase>(EDesignPhase.CHOOSE_CAR);
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

  const handleDesignDataChange = (phase: EDesignPhase, data: any) => {
    let newData;
    switch (phase) {
      case EDesignPhase.CHOOSE_CAR:
        newData = {
          ...designData,
          car: structuredClone(data),
        };
        setPhase(EDesignPhase.CHOOSE_DESIGN);

        break;
      case EDesignPhase.CHOOSE_DESIGN:
        newData = {
          ...designData,
          design: structuredClone(data),
        };
        setPhase(EDesignPhase.CONCLUSION);

        break;
      case EDesignPhase.CONCLUSION:
        newData = {
          ...designData,
          phoneNumber: structuredClone(data),
        };

        break;
      default:
        break;
    }

    setDesignData(newData as TDesignData);
  };

  const renderPhase = useMemo(() => {
    let phaseComponent;
    switch (phase) {
      case EDesignPhase.CHOOSE_CAR:
        phaseComponent = (
          <ChooseCar
            onNext={(data: any) =>
              handleDesignDataChange(EDesignPhase.CHOOSE_CAR, data)
            }
            brands={brands}
            years={years}
            data={designData.car}
          />
        );

        break;
      case EDesignPhase.CHOOSE_DESIGN:
        phaseComponent = (
          <ChooseDesign
            onNext={(data: any) =>
              handleDesignDataChange(EDesignPhase.CHOOSE_DESIGN, data)
            }
            data={designData.design}
            onPrevious={() => setPhase(EDesignPhase.CHOOSE_CAR)}
          />
        );

        break;
      case EDesignPhase.CONCLUSION:
        phaseComponent = (
          <Conclusion
            onPrevious={() => setPhase(EDesignPhase.CHOOSE_CAR)}
            onComplete={(data: any) =>
              handleDesignDataChange(EDesignPhase.CONCLUSION, data)
            }
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
            LỘT XÁC NỘI THẤT CÙNG <br />
            <span>LAVOR</span>
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10">
            <div className=" mx-auto mb-5 md:mb-10">
              <Image
                alt="Công xưởng Lavor"
                src={introduceImg}
                loading="eager"
                className="rounded-xl border-[6px] border-solid border-primary xl:h-[300px] h-[200px] md:h-[350px] md:w-[600px] w-[350px] xl:w-[500px] object-cover"
              />
            </div>
            <div className="leather-text text:base md:text-lg">
              <p className="mb-3 text-justify md:mb-5 xl:text-left">
                Lavor là thương hiệu hàng đầu Việt Nam về sản xuất các sản phẩm
                liên quan đến da cho nội thất ô tô. Chúng tôi đáp ứng mọi mong
                đợi của khách hàng từ phổ thông đến khác biệt nhất.
              </p>
              <p className="text-justify xl:text-left">
                Lavor tự hào với sự kết hợp cùng vị vua ngành da Mastrotto từ Ý
                và phụ liệu Amann hàng đầu từ Đức. Bên cạnh đó, Lavor sở hữu đội
                ngũ chuyên gia và kỹ thuật viên giàu kinh nghiệm, các kỹ sư có
                tuổi nghề lên tới 30 năm, luôn được đào tạo nâng cao nhằm đáp
                ứng các tiêu chuẩn phức tạp cũng như xu hướng của thị trường nội
                địa và quốc tế. Các sản phẩm liên quan tới da và bọc ghế da tại
                Lavor rất đa dạng như: Nệm ghế da ô tô, sàn xe, thảm lót chân,
                gối cổ, bọc tay lái...
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button link="/ve-chung-toi" text="Tìm hiểu thêm" />
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
