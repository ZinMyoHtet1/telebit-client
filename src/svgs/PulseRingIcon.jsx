import React from "react";

function PulseRingIcon({ width = 20, height = 20, fillColor = "#4f66b1" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={fillColor}
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
        transform="matrix(0 0 0 0 12 12)"
      >
        <animateTransform
          id="SVGk7g6Ie5D"
          attributeName="transform"
          begin="0;SVGADuEYsSK.begin+0.6s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          type="translate"
          values="12 12;0 0"
        ></animateTransform>
        <animateTransform
          additive="sum"
          attributeName="transform"
          begin="0;SVGADuEYsSK.begin+0.6s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          type="scale"
          values="0;1"
        ></animateTransform>
        <animate
          attributeName="opacity"
          begin="0;SVGADuEYsSK.begin+0.6s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="1;0"
        ></animate>
      </path>
      <path
        fill="#4f66b1"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
        transform="matrix(0 0 0 0 12 12)"
      >
        <animateTransform
          id="SVGADuEYsSK"
          attributeName="transform"
          begin="SVGk7g6Ie5D.begin+0.6s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          type="translate"
          values="12 12;0 0"
        ></animateTransform>
        <animateTransform
          additive="sum"
          attributeName="transform"
          begin="SVGk7g6Ie5D.begin+0.6s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          type="scale"
          values="0;1"
        ></animateTransform>
        <animate
          attributeName="opacity"
          begin="SVGk7g6Ie5D.begin+0.6s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="1;0"
        ></animate>
      </path>
    </svg>
  );
}

export default PulseRingIcon;
