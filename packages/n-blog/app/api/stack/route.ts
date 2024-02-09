import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { formatNumber } from "@/lib/utils";
import { groupBy } from "lodash";
import { repos } from "./_constant";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);


const token = `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`;
const fetchConfig = {
  headers: {
    Authorization: `Bearer ${token}`
  },
  next: {
    revalidate: 1000 * 10
  }
};

async function fetchRepoInfo(repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, fetchConfig);
    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error, {}];
  }
}

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
    console.log("npm", result);
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
    const latestVersion = metadata["dist-tags"].latest;
    const updateTime = metadata.time[latestVersion];
    console.log('meta',updateTime)
    return [null, { updateTime, latestVersion }];
  } catch (error) {
    return ["npm info error", { updateTime: "", latestVersion: "" }];
  }
}

const fetchRepoDetails = async ({ repo, tag, packageName }: any) => {
  const error = [];
  // 获取仓库信息

  const [repoError, repoInfo] = await fetchRepoInfo(repo);
  if (repoError) {
    error.push("repo error");
  }
  const {
    name,
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
  // 获取 NPM 版本信息
  const [npmVerError, npmVersions]: any = await fetchNpmLatest(packageName);
  if (npmVerError) {
    error.push("npm versions error");
  }
  return {
    name,
    version: npmVersions!.latestVersion,
    updateDate: dayjs(npmVersions!.updateTime).format("YYYY-MM-DD"),
    updateDateText: dayjs().to(npmVersions!.updateTime),
    stars: formatNumber(stars),
    createdAt: dayjs(createdAt).format("YYYY-MM-DD"),
    createdAtText: dayjs().to(createdAt),
    contributorsCount: formatNumber(contributorsCount as any),
    commitsCount: formatNumber(commitsCount as any),
    repo,
    tag,
    homepage,
    license,
    description,
    language,
    issuesUrl,
    openIssuesCount,
    downloads: formatNumber(npmDownloads),
    errors: error
  };
};

export async function GET() {
  const results = await Promise.all(repos.map(repo => fetchRepoDetails(repo)));
  return new Response(JSON.stringify(groupBy(results, "tag")), {
    headers: {
      "content-type": "application/json"
    }
  });
}
