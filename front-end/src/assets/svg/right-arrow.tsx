import React from "react";

const RightArrowPage = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="10"
      viewBox="0 0 17 10"
      stroke="white"
      fill="none"
    >
      <path
        d="M1 5L16 5M16 5L12 1M16 5L12 9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RightArrowPage;
