import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { groupBy } from "lodash";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { fetchNpmDetails } from "./npmUtils";
import { fetchGithubInfo } from "./githubUtils";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();

const fetchRepoDetails = async ({ tag, packageName }: any) => {
  const error = [];
  // 获取 NPM 版本信息
  const npmInfo = await fetchNpmDetails(packageName);
  const { repo, name, latestVersion, updateTime } = npmInfo as any;
  console.log("仓库信息", npmInfo, repo);
  // 获取仓库信息
  const githubInfo = await fetchGithubInfo(repo);
  const result: any = { ...githubInfo, ...npmInfo, tag, packageName ,errors:''};
  console.log("result", result);
  try {
    const res = await prisma.package.upsert({
      where: {
        name: result.name as string,
      },
      update: { ...result } as any,
      create: { ...result } as any,
    });
  } catch (err) {
    console.log("update error", err);
  }

  return result;
};

export async function GET() {
  const packages = await prisma.package.findMany();

  return new Response(JSON.stringify(groupBy(packages, "tag")), {
    headers: {
      "content-type": "application/json",
    },
  });
}

const _TEST_REPOS = [
  {
    packageName: "react",
    tag: "tool",
  },
];

export async function PUT() {
  // const repos = await prisma.projects.findMany();
  const repos = _TEST_REPOS;
  repos.map((repo) => fetchRepoDetails(repo));
  return new Response("ok", {
    headers: {
      "content-type": "application/json",
    },
  });
}
