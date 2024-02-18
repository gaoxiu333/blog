import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { groupBy, omit } from "lodash";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { fetchNpmDetails } from "./npmUtils";
import { fetchGithubInfo } from "./githubUtils";
import { projects } from "@/prisma/_constant";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();

export async function GET() {
  return new Response(JSON.stringify(groupBy([], "tag")), {
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
          ...omit(project, "types"),
        } as any,
        update: {
          ...omit(project, "types"),
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
