import { projects } from "./_constant";
import { PrismaClient } from "@prisma/client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import _ from "lodash";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();


async function main() {

}

main().then(async () => {
}).finally(() => {
  prisma.$disconnect();
});

