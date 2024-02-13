import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { groupBy } from "lodash";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const prisma = new PrismaClient();

const token = `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`;
const fetchConfig = {
  headers: {
    Authorization: `Bearer ${token}`
  },
  next: {
    revalidate: 1000 * 10
  }
};

// 获取Github仓库信息
async function fetchRepoInfo(repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, fetchConfig);
    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error, {}];
  }
}

// 获取Github贡献人数
async function fetchContributors(repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=1`, fetchConfig);
    const contributorsLink = response.headers.get("link");
    const contributorsLastPageMatch = contributorsLink!.match(/&page=(\d+)>; rel="last"/);
    const contributorsCount = contributorsLastPageMatch ? Number(contributorsLastPageMatch[1]) : 0;
    return [null, contributorsCount];
  } catch (error) {
    return [error, 0];
  }
}

// 获取Github提交数量
async function fetchCommitDetail(repo: string) {
  try {
    const commitsResponse = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, fetchConfig);
    const commitsLink = commitsResponse.headers.get("link");
    const commitsLastPageMatch = commitsLink!.match(/&page=(\d+)>; rel="last"/);
    const commitsCount = commitsLastPageMatch ? Number(commitsLastPageMatch[1]) : 0;
    return [null, commitsCount];
  } catch (error) {
    return [error, {}];
  }
}

// 获取 npm 下载量
async function fetchNpmInfo(packageName: string) {
  try {
    const response = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`);
    const result = await response.json();
    const { downloads } = result;
    return [null, downloads];
  } catch (error) {
    return ["npm error"];
  }
}

// 获取 npm 的最新版本以及更新时间
async function fetchNpmLatest(packageName: string) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    const metadata = await response.json();
    const { name } = metadata;
    const latestVersion = metadata["dist-tags"].latest;
    const updateTime = metadata.time[latestVersion];
    const repo = _.chain(metadata.repository.url).replace(".git", "").split("/").takeRight(2).join("/").value();
    return [null, { updateTime, latestVersion, name, repo }];
  } catch (error) {
    return ["npm info error", { updateTime: "", latestVersion: "" }];
  }
}

const fetchRepoDetails = async ({ tag, packageName }: any) => {
  const error = [];
  // 获取 NPM 版本信息
  const [npmVerError, npmVersions]: any = await fetchNpmLatest(packageName);
  if (npmVerError) {
    error.push("npm versions error");
  }
  const { repo, name, latestVersion, updateTime } = npmVersions;
  // 获取仓库信息
  const [repoError, repoInfo] = await fetchRepoInfo(repo);
  if (repoError) {
    error.push("repo error");
  }
  const {
    updated_at: updateDate,
    language,
    issues_url: issuesUrl,
    open_issues_count: openIssuesCount,
    stargazers_count: stars,
    homepage,
    license,
    description,
    created_at: createdAt
  } = repoInfo;

  // 获取贡献人数
  const [contributorsError, contributorsCount] = await fetchContributors(repo);
  if (contributorsError) {
    error.push("contributors error");
  }
  // 获取提交数量
  const [commitError, commitsCount] = await fetchCommitDetail(repo);
  if (commitError) {
    error.push(commitError);
  }
  // 获取 NPM 下载量
  const [npmError, npmDownloads] = await fetchNpmInfo(packageName);
  if (npmError) {
    error.push("npm download error");
  }
  const result = {
    name: name || packageName,
    tag,
    packageName,
    version: latestVersion,
    updateDate: dayjs(updateTime).format("YYYY-MM-DD"),
    stars: stars || 0,
    createdDate: createdAt,
    contributorsCount: contributorsCount,
    commitsCount: commitsCount,
    description,
    repo,
    homepage,
    language,
    issuesUrl,
    openIssuesCount,
    downloads: npmDownloads,
    errors: error.join(",")
  };

  try {
    const res = await prisma.package.upsert({
      where: {
        name: result.name as string
      },
      update: { ...result } as any,
      create: { ...result } as any
    });
  } catch (err) {
    console.log("update error", err);
  }

  return result;
};

const fetchNpmDetails = async (packageName: string) => {

  // 下载量
  try {
    const response = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`);
    const result = await response.json();
    const { downloads } = result;
    return [null, downloads];
  } catch (error) {
    return ["npm error"];
  }

  // npm 版本信息
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    const metadata = await response.json();
    const { name } = metadata;
    const latestVersion = metadata["dist-tags"].latest;
    const updateTime = metadata.time[latestVersion];
    const repo = _.chain(metadata.repository.url).replace(".git", "").split("/").takeRight(2).join("/").value();
    return [null, { updateTime, latestVersion, name, repo }];
  } catch (error) {
    return ["npm info error", { updateTime: "", latestVersion: "" }];
  }
};

export async function GET() {
  const packages = await prisma.package.findMany();


  return new Response(JSON.stringify(groupBy(packages, "tag")), {
    headers: {
      "content-type": "application/json"
    }
  });
}

export async function PUT() {
  const repos = await prisma.projects.findMany();
  repos.map(repo => fetchRepoDetails(repo));
  return new Response("ok", {
    headers: {
      "content-type": "application/json"
    }
  });
}
