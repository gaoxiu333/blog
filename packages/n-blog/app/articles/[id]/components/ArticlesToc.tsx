"use client";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import type { SVGProps } from "react";

export function ArticlesToc({ TOC, minDepth }: any) {
  // 是否显示导航
  const [showToc, setShowToc] = useState(false);
  const handleShowToc = () => {
    setShowToc(!showToc);
  };
  return (
    <div className="translate fixed right-0  top-1/2 h-0  w-0">
      <Button
        onPress={handleShowToc}
        isIconOnly
        variant="ghost"
        className={
          "visible absolute right-[100%] top-0 -translate-y-1/2 transition-all" +
          " " +
          testTranslate(!showToc)
        }
      >
        <HeroiconsSolidChevronDoubleLeft />
      </Button>
      <Card
        className={
          "visible absolute right-[100%] top-0 w-64 -translate-y-1/2 transition-all" +
          " " +
          testTranslate(showToc)
        }
      >
        <CardHeader className="text-xl font-black text-default-300">
          <header className="text-xl font-black text-default-300">目录</header>
          <Button
            isIconOnly
            color="primary"
            variant="light"
            onPress={handleShowToc}
          >
            <HeroiconsSolidChevronDoubleRight />
          </Button>
        </CardHeader>
        <CardBody className="max-h-[400px] p-5">
          <nav>
            <ul>
              {TOC.map((item: any, idx: number) => (
                <li key={idx} className={headingClass(item.depth - minDepth)}>
                  <a href={"#" + item.id}>{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        </CardBody>
      </Card>
    </div>
  );
}

function headingClass(depth: number) {
  switch (depth) {
    case 0:
      return "text-base text-default-500 leading-8 ";
    case 1:
      return "text-sm text-default-500 ml-3 leading-8";
    default:
      return "text-sm text-default-500 ml-3 leading-8";
  }
}

function HeroiconsSolidChevronDoubleRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M10.293 15.707a1 1 0 0 1 0-1.414L14.586 10l-4.293-4.293a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0"></path>
        <path d="M4.293 15.707a1 1 0 0 1 0-1.414L8.586 10L4.293 5.707a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0"></path>
      </g>
    </svg>
  );
}

export function HeroiconsSolidChevronDoubleLeft(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.707 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1 0 1.414m-6 0a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L5.414 10l4.293 4.293a1 1 0 0 1 0 1.414"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function testTranslate(is: boolean) {
  return is ? "translate-x-0" : "invisible translate-x-full";
}
