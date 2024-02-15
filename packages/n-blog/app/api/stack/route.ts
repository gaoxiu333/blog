import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { groupBy } from "lodash";
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

const _TEST_REPOS = [
  {
    packageName: "react",
    tag: "前端框架",
  },
];

async function refreshDatabase() {
  return await Promise.all(
    projects.map((project) => {
      console.log("project", project);
      return prisma.stack.upsert({
        where: {
          name: project.name,
        },
        create: {
          ...project,
        },
        update: {
          ...project,
        },
      });
    }),
  );
}

export async function PUT() {
  await refreshDatabase();
  return new Response("ok", {
    headers: {
      "content-type": "application/json",
    },
  });
}
