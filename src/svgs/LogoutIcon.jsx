import React from "react";

function LogoutIcon({ width = 20, height = 20, fillColor = "#000" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
    >
      <g
        fill="none"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path d="M23.9917 6H6V42H24"></path>
        <path d="M33 33L42 24L33 15"></path>
        <path d="M16 23.9917H42"></path>
      </g>
    </svg>
  );
}

export default LogoutIcon;
