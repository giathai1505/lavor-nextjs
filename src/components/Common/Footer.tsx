import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo/logo-white.png";
import certificate from "@/assets/images/certificate.png";
import { FaSquareFacebook, FaTiktok } from "react-icons/fa6";
import { AiFillGooglePlusCircle, AiFillYoutube } from "react-icons/ai";
import { footerData } from "@/data/footer";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="max-w-[1200px] mx-auto py-10">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <Image alt="logo" src={logo} className="w-52 mb-10" />
            <div className="mb-5">
              <p className="common-text">
                Công ty TNHH Thương mại Dịch vụ và Sản xuất Minh Tâm <br />
                GPKD số 0105409819 do Sở KH và ĐT TP Hà Nội cấp ngày 09/01/2020{" "}
                <br />
                Địa Chỉ: Lô A1, Cụm Công nghiệp Dương Liễu, X. Dương Liễu, H.
                Hoài Đức, TP. Hà Nội
              </p>
            </div>
            <Image
              alt="Chứng nhận bộ công thương"
              src={certificate}
              className="w-40"
            />
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-20 text-white">
            {footerData.map((item) => {
              return (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="w-[100px] h-[2px] bg-primary my-4"></div>
                  <div>
                    <ul>
                      {item.child.map((item) => {
                        return (
                          <li className="mb-1 hover:text-primary">
                            <Link href={item.slug} className="footer-link">
                              {item.icon}
                              <p>{item.name}</p>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {item.hasMedia ? (
                    <div className="flex justify-between mt-4 media-icon">
                      <Link href="https://www.facebook.com/LavorLuxury2">
                        <FaSquareFacebook />
                      </Link>
                      <Link href="https://www.tiktok.com/@lavorluxury.official">
                        <FaTiktok />
                      </Link>
                      <Link href="https://minhtamvietnam.vn/">
                        <AiFillGooglePlusCircle />
                      </Link>
                      <Link href="https://www.youtube.com/channel/UCR4hf6Azj1amYpaDriauRHw">
                        <AiFillYoutube />
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
