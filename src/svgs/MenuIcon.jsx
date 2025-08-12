import React from "react";

function MenuIcon({ width = 20, height = 20, fillColor = "#000" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
    >
      <path
        fill={fillColor}
        fillRule="evenodd"
        d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default MenuIcon;
