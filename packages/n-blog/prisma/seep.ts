import { projects } from "./_constant";
import { PrismaClient } from "@prisma/client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { formatNumber } from "@/lib/utils";
import _ from "lodash";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();


async function main() {
  const result = await Promise.all(projects.map(item => {
    return prisma.projects.upsert({
      where: {
        packageName: item.packageName as string
      },
      update: {
        packageName: item.packageName as string,
        tag: item.tag
      },
      create: {
        packageName: item.packageName as string,
        tag: item.tag
      }
    });
  }));
  const group = _.chain(result).groupBy("tag").keys().value();
  const stack = await Promise.all(group.map(item => {
    return prisma.stack.upsert({
      where: {
        name: item as string
      },
      update: {
        name: item
      },
      create: {
        name: item
      }
    });
  }));

}

main().then(async () => {
}).finally(() => {
  prisma.$disconnect();
});

