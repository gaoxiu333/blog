import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  const searchParams = new URL(request.url).searchParams;
  const tag = searchParams.get("tag") || "";
  const tags = tag.split(",");
  const stack = await prisma.stack.findMany();
  const npm = await prisma.npm.findMany();
  const github = await prisma.github.findMany();
  const data = stack
    .map((item) => ({
      ...item,
      ...github.find((g) => g.name === item.name),
      ...npm.find((n) => n.name === item.name),
    }))
    .filter((item) =>
      tags.length > 0 ? tags.every((tag) => ~item.tag.indexOf(tag)) : true,
    );
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
