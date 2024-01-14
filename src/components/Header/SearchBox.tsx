"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Empty } from "antd";
import { IProduct, ProductTypeToText } from "@/types/type";
import { formatCurrencyWithDots } from "@/utilities/commonUtilities";
import useDebounce from "@/hooks/useDebounce";
import "./header.css";
import Each from "@/lib/Each";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";

const renderSearchItem = (product: IProduct) => {
  return (
    <Link
      className="flex justify-between items-center hover:bg-[#f47a2047] px-5 py-1"
      href={"/" + product.product_id}
      key={product.product_id}
    >
      <div className="flex gap-5 mb-5">
        <img
          src={product.product_images[0]}
          className="w-20 h-20 rounded object-cover"
        />
        <div className=" flex flex-col gap-[5px] mb-1">
          <p className="font-bold">{product.product_name}</p>
          <p className="font-bold text-primary">
            {formatCurrencyWithDots(product.product_price)} đ
          </p>
          <p className="text-white bg-black w-fit px-4 py-1 rounded-xl text-xs">
            {ProductTypeToText[product.product_type]}
          </p>
        </div>
      </div>
    </Link>
  );
};

type TSearchBoxProps = {
  show: boolean;
  close: () => void;
};

const SearchBox: React.FC<TSearchBoxProps> = ({ close, show }) => {
  const [searchContent, setSearchContent] = useState<string>("");
  const [searchResult, setsearchResult] = useState<IProduct[]>([]);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const debounceSearchValue = useDebounce(searchContent, 500);
  useClickOutside(searchBoxRef, close);
  const { get } = useFetchApi();

  useEffect(() => {
    const invokeSearch = async (key: string) => {
      if (key === "") {
        setsearchResult([]);
      } else {
        const url = "?page=1&limit=10" + "&search=" + key;

        try {
          const res: any = await get(API_ROUTES.product.getAll(url));

          if (res && res.products) {
            setsearchResult(res.products);
          } else {
            setsearchResult([]);
          }
        } catch (error) {
          setsearchResult([]);
        }
      }
    };

    invokeSearch(searchContent);
  }, [debounceSearchValue]);

  return (
    <div className="search-container shadow-md" ref={searchBoxRef}>
      <div className="search-box">
        <input
          type="text"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          className="flex-1"
          placeholder="Nhập từ khóa"
        />
        <div className="search-icon ">
          <FiSearch className="text-white" />
        </div>
      </div>
      <p className="text-black ml-5 mt-3">
        Từ khóa : "<span className="font-bold">{searchContent}</span>"
      </p>
      <div className="search-result">
        <p className="text-base font-bold ml-5">Sản phẩm</p>
        <div className="max-h-[400px] overflow-y-scroll my-3">
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            <div>
              <Each
                of={searchResult}
                render={(product, _) => renderSearchItem(product)}
              />
            </div>
          ) : (
            <Empty description="Không có kết quả tìm kiếm" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
