import { ArticlesList } from "@/components/Articles";
import { STACK_TAP_MAP } from "@/prisma/_constant";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { getTopStack } from "./api/stack/handler";
import { HomePanle } from "@/components/HomePanle";

export default async function Home() {
  return (
    <>
      <HomePanle />
      <ArticlesList />
    </>
  );
}

async function HomeStacks() {
  const stacks = await Promise.all(
    STACK_TAP_MAP.map(async (item) => {
      return {
        ...item,
        group: await getTopStack(item.name),
      };
    }),
  );
  return (
    <Card className="container">
      <CardHeader className="text-default-500">追踪我的常用堆栈</CardHeader>
      <CardBody>
        <ul className="flex justify-between">
          {stacks.map((item) => {
            return (
              <li key={item.name}>
                <h3 className="text-xl font-black capitalize text-default-400">
                  {item.name}

                  {/* <Icon icon={item.icon} width={20} height={20} /> */}
                </h3>
                <main>
                  <ul>
                    {item.group.map((stack: any) => {
                      return (
                        <li
                          key={stack.name}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={stack.organizationAvatar}
                            alt={stack.name}
                            width={20}
                          />
                          <span className="text-default-600">{stack.name}</span>
                          {stack.isUpdated && (
                            <span className="relative flex h-1 w-1">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex h-1 w-1 rounded-full bg-green-500"></span>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </main>
              </li>
            );
          })}
        </ul>
      </CardBody>
      <CardFooter>
        <Link href="/stack">查看更多</Link>
      </CardFooter>
    </Card>
  );
}
