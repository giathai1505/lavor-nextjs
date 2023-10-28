import Link from "next/link";
import React from "react";
import { AiFillContacts, AiFillHome } from "react-icons/ai";

interface IBreadCrumb {
  text: string;
}

const Breadcrumb: React.FC<IBreadCrumb> = ({ text }) => {
  return (
    <div className="breadcrumb-wrapper">
      <ul>
        <li>
          <Link href="/" className="z-40 px-2">
            <AiFillHome />
          </Link>
        </li>

        <li>
          <Link href="/">
            <div>
              <AiFillContacts />
              <span>{text}</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
