import React from "react";

function FolderSolid({
  width = 16,
  height = 16,
  fillColor = "#4361ee",
  ...rest
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        fill={fillColor}
        d="M2 20V4h8l2 2h10v2H4v10l2.4-8h17.1l-3 10z"
      ></path>
    </svg>
  );
}

export default FolderSolid;
