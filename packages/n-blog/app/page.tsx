"use client";

import { Card, CardBody, Button } from "@nextui-org/react";
import { Button as SButton } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mt-9">
      <Card>
        <CardBody>
          <h3 className="font-bold">标题1</h3>
          <p className="text-sm">2022-10-01 22:10</p>
          <button className="btn">Button</button>
          <Button color="default">Default</Button>
          <SButton>sbutton</SButton>
        </CardBody>
      </Card>
    </div>
  );
}
