"use client";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import _ from "lodash";
import { FRONTEND_TAP_MAP } from "@/prisma/_constant";
import { useEffect, useState } from "react";

async function getTag(tag: string) {
  const response = await fetch(`/api/stack?tag=${tag || ""}`);
  return await response.json();
}

export function Panel({ name, tag }: { name: string; tag: any }) {
  const [stacks, setStacks] = useState([]);
  useEffect(() => {
    getTag(tag).then((res) => {
      console.log("res", res);
      setStacks(res);
    });
  }, []);

  return (
    <Card className="block" isPressable isBlurred>
      <CardHeader>
        <h3>{name}</h3>
      </CardHeader>
      <CardBody className="flex flex-col gap-1">
        {stacks.map((item: any, idx: number) => {
          return (
            <div key={idx} className="flex items-center gap-2 text-small">
              <Image
                width={16}
                height={16}
                src={item.organizationAvatar}
                alt={item.name}
              />
              <span>
                {item.name} · v{item.version}
              </span>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
