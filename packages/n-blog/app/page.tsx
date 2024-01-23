"use client";

import { Card, CardBody } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="container mt-9">
      <Card>
        <CardBody>
          <h3 className="font-bold">标题1</h3>
          <p className="text-sm">2022-10-01 22:10</p>
        </CardBody>
      </Card>
    </div>
  );
}
