import type { SVGProps } from "react";

const MarkerFilter: React.FC<SVGProps<SVGAElement>> = (props) => {
  return (
    <svg
      xmlns="//www.w3.org/2000/svg"
      className="svg-marker-filter"
      style={{
        display: "none",
      }}
      {...props}
    >
      <defs>
        <filter id="marker-shape">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0 0.15"
            numOctaves="1"
            result="warp"
          ></feTurbulence>
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="30"
            in="SourceGraphic"
            in2="warp"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
};
