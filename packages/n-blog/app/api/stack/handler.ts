import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();

// 根据 tag 获取数据
export async function getAllStack(tag?: string) {
  const tags = tag?.split(",") || [];
  const stack = await prisma.stack.findMany();
  const npm = await prisma.npm.findMany();
  const github = await prisma.github.findMany();
  const result = stack
    .map((item) => ({
      ...item,
      ...github.find((g) => g.name === item.name),
      ...npm.find((n) => n.name === item.name),
    }))
    .filter((item) =>
      tags.length > 0 ? tags.every((tag) => ~item.tag.indexOf(tag)) : true,
    );

  return result;
}

// 获取三个堆栈：按照 star 和更新时间排序
export async function getTopStack(tag?: string) {
  const threeMountAge = dayjs().subtract(2, "month");
  const data = await getAllStack(tag);
  // 先获取最新的三个
  const latest = _.chain(data)
    .filter((item) => dayjs(item.updatedAt).isAfter(threeMountAge))
    .sortBy("updatedAt")
    .take(3)
    .map((item) => ({ ...item, isUpdated: true }))
    .value();
  const topStar = _.chain(data).sortBy("stars").take(3).value();
  return _.take(_.unionBy([...latest, ...topStar], "name"), 3);
}