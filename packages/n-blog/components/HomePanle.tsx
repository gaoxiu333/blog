import { getRandomStack } from "@/app/api/stack/handler";
import { IfyIcon } from "@/client/components/IfyIcon";
import { Card, CardBody, Link, Image } from "@nextui-org/react";

const STACKS = [
  {
    name: "react",
    icon: "logos:react",
  },
  {
    name: "vue",
    icon: "logos:vue",
  },
  {
    name: "angular",
    icon: "logos:angular-icon",
  },
  {
    name: "nodejs",
    icon: "logos:nodejs",
  },
  {
    name: "python",
    icon: "logos:python",
  },
];
export const HomePanle = async () => {
  const stacks = await getRandomStack(9);
  return (
    <Card className="w-full" radius="none" isBlurred shadow="none">
      <CardBody className="p-12">
        <main className="container flex flex-row flex-nowrap">
          <div className="flex basis-1/2 flex-col items-center justify-around py-12">
            <p className="text-default-500">Hi~ 我是一名小前端</p>
            <p className="text-default-500">会一些</p>
            <span className="home-panle font-black">
              React、Vue、Angular、Nodejs...
            </span>
            <p className="flex gap-2">
              {STACKS.map((stack: any) => {
                return (
                  <IfyIcon
                    key={stack.name}
                    icon={stack.icon}
                    width={12}
                    height={12}
                  />
                );
              })}
            </p>
          </div>
          <div className="flex  basis-1/2 flex-col justify-end gap-6">
            <ul className="flex flex-wrap justify-center gap-8">
              {stacks.map((stack: any) => {
                return (
                  <li
                    key={stack.name}
                    style={{
                      animation: `bounce ${Math.round(Math.random() * 30)}s infinite`,
                    }}
                    className="flex  items-center gap-2"
                  >
                    <Image
                      src={stack.organizationAvatar}
                      alt={stack.name}
                      isBlurred
                      isZoomed
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-small text-default-300">
                      {stack.name}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="text-center ">
              <Link className="text-small" href="/stack">
                查看我使用的堆栈
              </Link>
            </div>
          </div>
        </main>
      </CardBody>
    </Card>
  );
};
