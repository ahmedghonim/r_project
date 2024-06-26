import React from "react";

const BurgerPage = (prop: any) => {
  return (
    <svg
      {...prop}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5H5C4.44772 5 4 5.44772 4 6V9C4 9.55228 4.44772 10 5 10H19C19.5523 10 20 9.55228 20 9V6C20 5.44772 19.5523 5 19 5Z"
        stroke="white"
        stroke-linejoin="round"
      />
      <path
        d="M19 14H5C4.44772 14 4 14.4477 4 15V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V15C20 14.4477 19.5523 14 19 14Z"
        stroke="white"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BurgerPage;
