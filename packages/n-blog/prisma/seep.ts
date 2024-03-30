import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { omit } from "lodash";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { fetchNpmDetails } from "./npmUtils";
import { fetchGithubInfo } from "./githubUtils";
import { projects } from "./_constant";

const prisma = new PrismaClient();

async function refreshDatabase() {
  await Promise.all(
    projects.map((project) => {
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
      try {
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
      } catch (error) {
        console.log("error", error);
      }
    }),
  );
}
// 刷新npm，github

async function main() {
  await refreshDatabase();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
