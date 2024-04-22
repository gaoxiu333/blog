"use client";
import clsx from "clsx";
import type { SVGProps } from "react";
import React, { isValidElement } from "react";

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
      <code
        {...props}
        className={clsx(
          { "hightlight-link": isValidElement(props.children) },
          className
        )}
      >
      
      </code>
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

export { MarkerFilter, MarkerLink };
