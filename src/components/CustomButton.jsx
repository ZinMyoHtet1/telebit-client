import React from "react";
import "./../styles/customButton.css";
function CustomButton({ text, handleClick = () => {}, variant = "solid" }) {
  // const style = {
  //   fontSize: `${size}px`,
  //   color: "#fff",
  //   padding: "6px 12px",
  //   border: `solid 1px ${color}`,
  //   backgroundColor: color,
  //   borderRadius: "6px",
  //   fontWeight: "400",
  //   boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  // };

  // if (variant === "outline") {
  //   style.backgroundColor = "#fff";
  //   style.color = color;
  // }

  return (
    <button className={`custom_button btn ${variant}`} onClick={handleClick}>
      {text}
    </button>
  );
}

export default CustomButton;
