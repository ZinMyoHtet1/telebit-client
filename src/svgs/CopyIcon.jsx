import React from "react";

function CopyIcon({ width = 20, height = 20, fillColor = "#000" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M16 3H4v13"></path>
        <path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
      </g>
    </svg>
  );
}

export default CopyIcon;
