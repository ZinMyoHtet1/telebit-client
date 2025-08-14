import React from "react";

function DownloadAnimateIcon({ width = 20, height = 20, fillColor = "#000" }) {
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
        <path
          fill="#4f66b1"
          fillOpacity={0}
          strokeDasharray={20}
          strokeDashoffset={20}
          d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"
        >
          <animate
            attributeName="d"
            begin="0.5s"
            dur="1.5s"
            repeatCount="indefinite"
            values="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5;M12 4h2v3h2.5l-4.5 4.5M12 4h-2v3h-2.5l4.5 4.5;M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"
          ></animate>
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.7s"
            dur="0.5s"
            values="0;1"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="20;0"
          ></animate>
        </path>
        <path strokeDasharray={14} strokeDashoffset={14} d="M6 19h12">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.2s"
            values="14;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export default DownloadAnimateIcon;
