import React from "react";

function MoreVerticalIcon({
  width = 16,
  height = 16,
  fillColor = "#4361ee",
  ...rest
}) {
  return (
    <div {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        // {...rest}
      >
        <g fill={fillColor}>
          <circle
            cx={12}
            cy={18}
            r={1.75}
            transform="rotate(-90 12 18)"
          ></circle>
          <circle
            cx={12}
            cy={12}
            r={1.75}
            transform="rotate(-90 12 12)"
          ></circle>
          <circle cx={12} cy={6} r={1.75} transform="rotate(-90 12 6)"></circle>
        </g>
      </svg>
    </div>
  );
}

export default MoreVerticalIcon;
