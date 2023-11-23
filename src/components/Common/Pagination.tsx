import React, { useEffect, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <div className="">
        <div className="pagination">
          <ul className="flex items-center gap-2">
            {currentPage === 1 ? null : (
              <li className="pagination-item ">
                <button onClick={() => onPageChange(currentPage - 1)}>
                  <GoArrowLeft />
                </button>
              </li>
            )}

            {Array.from(Array(totalPages).keys()).map((page, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onPageChange(page + 1)}
                  className={`pagination-item ${
                    currentPage === page + 1 ? "active" : ""
                  }`}
                >
                  {page + 1}
                </li>
              );
            })}

            {currentPage === totalPages ? null : (
              <li
                className="pagination-item "
                onClick={() => onPageChange(currentPage + 1)}
              >
                <GoArrowRight />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
