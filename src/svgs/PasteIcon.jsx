import React from "react";

function PasteIcon({ width = 20, height = 20, fillColor = "#000" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <path
        fill="none"
        stroke={fillColor}
        strokeLinejoin="round"
        d="M4 8.5h5m-5 2h5m3 0h1.5v-8h-8V4m-3 9.5h8v-8h-8z"
        strokeWidth={1}
      ></path>
    </svg>
  );
}

export default PasteIcon;
