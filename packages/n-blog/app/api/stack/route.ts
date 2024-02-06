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
const fetchRepoDetails = async ({ repo, tag }: any) => {
  try {
    const testResponse = await fetch("http://localhost:8080/template");
    // 获取仓库信息
    const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, fetchConfig);
    const repoInfo = await repoResponse.json();
    console.log('res',repoInfo)
    const {name,updated_at,language,issues_url:issuesUrl,open_issues_count:openIssuesCount, stargazers_count: stars, homepage, license, description, created_at: createdAt } = repoInfo;

    // 获取最新版本标签
    const response = await fetch(`https://api.github.com/repos/${repo}/tags`, fetchConfig);
    const tags = await response.json();
    const latestTag = tags[0];

    // 获取最新标签的提交日期
    const commitResponses = await fetch(latestTag.commit.url);
    const commit = await commitResponses.json();
    const updateDate = commit.commit.committer.date || "";// fix: 有可能是 undefined

    // 获取贡献人数
    const contributorsResponse = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=1`, fetchConfig);
    const contributorsLink = contributorsResponse.headers.get("link");
    const contributorsLastPageMatch = contributorsLink!.match(/&page=(\d+)>; rel="last"/);
    const contributorsCount = contributorsLastPageMatch ? Number(contributorsLastPageMatch[1]) : 0;

    // 获取提交数量
    const commitsResponse = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, fetchConfig);
    const commitsLink = commitsResponse.headers.get("link");
    const commitsLastPageMatch = commitsLink!.match(/&page=(\d+)>; rel="last"/);
    const commitsCount = commitsLastPageMatch ? Number(commitsLastPageMatch[1]) : 0;

    return {
      name,
      version: latestTag.name,
      updateDate: dayjs(updateDate).format("YYYY-MM-DD"),
      updateDateText: dayjs().to(updateDate),
      stars: formatNumber(stars),
      createdAt: dayjs(createdAt).format("YYYY-MM-DD"),
      createdAtText: dayjs().to(createdAt),
      contributorsCount: formatNumber(contributorsCount),
      commitsCount: formatNumber(commitsCount),
      repo,
      tag,
      homepage,
      license,
      description,
      language,
      issuesUrl,
      openIssuesCount
    };

  } catch (err) {
    console.log("error");
    return {
      name:'',
      version: "未知",
      updateDate: "未知",
      updateDateText: "未知",
      stars: "未知",
      createdAt: "未知",
      createdAtText: "未知",
      contributorsCount: "未知",
      commitsCount: "未知",
      repo,
      tag

    };
  }
};

export async function GET() {
  const results = await Promise.all(repos.map(repo => fetchRepoDetails(repo)));
  return new Response(JSON.stringify(groupBy(results, "tag")), {
    headers: {
      "content-type": "application/json"
    }
  });
}
