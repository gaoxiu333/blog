"use client";

import clsx from "clsx";
import type { SVGProps } from "react";

const MarkerFilter = (props: SVGProps<SVGSVGElement>) => {
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

const MarkerLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  className,
  ...props
}) => {
  return (
    <>
      <a className={clsx("hightlight-link", className)} {...props} />
      <style jsx>
        {`
          .hightlight-link {
            display: inline-block;
            position: relative;
            &::before {
              content: "";
              width: 100%;
              height: 80%;
              position: absolute;
              background-color: red;
              z-index: -1;
              filter: url(#marker-shape);
              left: -0.1em;
              top: 0.1em;
              padding: 0 0.1em;
            }
          }
        `}
      </style>
    </>
  );
};

const UnderlineLink = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  return (
    <>
      <a className="animated-underline with-dots" {...props}></a>
      {/* <style jsx>
        {`
          .animate-underline {
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              transform: scaleX(0);
              height: 2px;
              bottom: 0;
              left: 0;
              background-color: #000;
              transform-origin: bottom right;
              transition: transform 0.25s ease-out;
            }
            &:hover::after {
              transform: scaleX(1);
              transform-origin: bottom left;
            }
          }
        `}
      </style> */}
    </>
  );
};

export { MarkerFilter, MarkerLink, UnderlineLink };
