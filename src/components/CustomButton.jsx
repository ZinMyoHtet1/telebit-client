import React from "react";

function CustomButton({
  text,
  handleClick = () => {},
  variant = "solid",
  size = 14,
  color = "#4361ee",
}) {
  const style = {
    fontSize: `${size}px`,
    color: "#fff",
    padding: "6px 12px",
    border: `solid 1px ${color}`,
    backgroundColor: color,
    borderRadius: "6px",
    fontWeight: "400",
    boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  };

  if (variant === "outline") {
    style.backgroundColor = "#fff";
    style.color = color;
  }

  return (
    <button className="btn" style={style} onClick={handleClick}>
      {text}
    </button>
  );
}

export default CustomButton;
