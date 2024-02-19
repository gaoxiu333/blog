import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { omit } from "lodash";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { fetchNpmDetails } from "./npmUtils";
import { fetchGithubInfo } from "./githubUtils";
import { projects } from "@/prisma/_constant";

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

async function refreshDatabase() {
  await Promise.all(
    projects.map((project) => {
      console.log("project", project);
      return prisma.stack.upsert({
        where: {
          name: project.name,
        },
        create: {
          ...omit(project, "tags"),
        } as any,
        update: {
          ...omit(project, "tags"),
        },
      });
    }),
  );
  await Promise.all(
    projects.map(async (project) => {
      const npmInfo = await fetchNpmDetails(project);
      const githubInfo = await fetchGithubInfo(project);
      await prisma.npm.upsert({
        where: {
          name: project.name,
        },
        create: {
          ...npmInfo,
          tag: project.tag,
        },
        update: {
          ...npmInfo,
          tag: project.tag,
        },
      });
      await prisma.github.upsert({
        where: {
          name: project.name,
        },
        create: {
          ...githubInfo,
          tag: project.tag,
        } as any,
        update: {
          ...githubInfo,
          tag: project.tag,
        },
      });
    }),
  );
}
// 刷新npm，github
export async function PUT() {
  await refreshDatabase();
  return new Response("ok", {
    headers: {
      "content-type": "application/json",
    },
  });
}
