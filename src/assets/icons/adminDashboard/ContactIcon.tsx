import React from "react";

const ContactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      {...props}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <path
          d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z"
          fill="#fff"
          opacity="0.3"
        ></path>
        <path
          d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z"
          fill="#fff"
        ></path>
        <rect
          fill="#ffffff"
          opacity="0.3"
          x="10"
          y="9"
          width="7"
          height="2"
          rx="1"
        ></rect>
        <rect
          fill="#ffffff"
          opacity="0.3"
          x="7"
          y="9"
          width="2"
          height="2"
          rx="1"
        ></rect>
        <rect
          fill="#ffffff"
          opacity="0.3"
          x="7"
          y="13"
          width="2"
          height="2"
          rx="1"
        ></rect>
        <rect
          fill="#ffffff"
          opacity="0.3"
          x="10"
          y="13"
          width="7"
          height="2"
          rx="1"
        ></rect>
        <rect
          fill="#ffffff"
          opacity="0.3"
          x="7"
          y="17"
          width="2"
          height="2"
          rx="1"
        ></rect>
        <rect
          fill="#ffffff"
          opacity="0.3"
          x="10"
          y="17"
          width="7"
          height="2"
          rx="1"
        ></rect>
      </g>
    </svg>
  );
};

export default ContactIcon;
