
import React from "react";

function MyMediaIcon({ width = 20, height = 20, fillColor = "#000" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path fill={fillColor} fillRule="evenodd" d="M1 2.333v17.411l11 3.3l11-3.3V2.334l-1.735-1.157L12 3.957l-9.265-2.78zm11 3.711l-9-2.7v14.912l8 2.4V9.251l2-.6v12.005l8-2.4V3.344zm7 .812l-4 1.2v2.088l4-1.2z" clipRule="evenodd"></path></svg>

  )
  
}

export default MyMediaIcon;
