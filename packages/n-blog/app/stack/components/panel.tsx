import { PrismaClient } from "@prisma/client";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import _ from "lodash";
import { FRONTEND_TAP_MAP } from "@/prisma/_constant";

const prisma = new PrismaClient();
async function getTag(type: string) {
  const stack = await prisma.stack.findMany();
  const npm = await prisma.npm.findMany();
  const github = await prisma.github.findMany();
  const tags = _.chain(stack)
    .map((item) => item.tag.split(",")[0])
    .uniq()
    .value();
  const stacks = stack
    .map((item) => ({
      ...item,
      ...github.find((g) => g.name === item.name),
      ...npm.find((n) => n.name === item.name),
    }))
    .filter((item) => (type === "all" ? true : ~item.tag.indexOf(type)));
  return { tags, stacks };
}

export async function Panel({ type }: { type: any }) {
  const { stacks } = await getTag(type);

  return (
    <section className="grid grid-cols-4 gap-4">
      {FRONTEND_TAP_MAP.map(({ key, name }: any, idx: number) => {
        return (
          <Card key={idx} className="block" isPressable isBlurred>
            <CardHeader>
              <Link href={`/stack/${type}/${key}`}>
                <h3>{name}</h3>
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col gap-1">
              {stacks
                .filter((item) => ~item.tag.indexOf(key))
                .map((item: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-small"
                    >
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
      })}
    </section>
  );
}
