import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  link: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ children, link, text }) => {
  return (
    <div className="button">
      <Link href={link} className="button-link">
        <span className="relative z-10">{text}</span>
      </Link>
    </div>
  );
};

export default Button;
