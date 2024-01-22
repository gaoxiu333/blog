"use client";

import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <div className="container border">
      <p>我是首页内容</p>
      <Disclosure>
        <Disclosure.Button className="py-2">我是一个按钮</Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          我是一个面板
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
