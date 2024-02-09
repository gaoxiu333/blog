import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { formatNumber } from "@/lib/utils";
import { groupBy } from "lodash";
import { repos } from "./_constant";
import awk from "refractor/lang/awk";

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

const fetchNpmDownloads = async ({ packageName }: any) => {

  try {
    // 获取npm周下载量
    const npmResponse = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`);
    const { downloads } = await npmResponse.json();
    return downloads;
  } catch (err) {
    return null;
  }
};

const fetchNpmInfo = async ({ packageName }: any) => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`, { cache: "force-cache" });
    const result = await response.json();

    const { name, repository, version } = result;
    const githubRepoSplit = repository.url.split("/");
    const githubOwner = githubRepoSplit.pop();
    const githubRepo = githubRepoSplit.pop();
    return {
      name, version, githubRepoName: githubRepo + "/" + githubOwner.replace(".git", "")
    };
  } catch (error) {
    return null;
  }
};

const fetchRepoDetails = async (repo: string) => {
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, fetchConfig);
    const repoInfo = await repoResponse.json();
    const { stargazers_count: stars } = repoInfo;
    return stars
  } catch (err) {
    return null;
  }
};

const getData = async (npm: any) => {
  const packageDetail = await fetchNpmInfo(npm);
  const weeklyDownloads = await fetchNpmDownloads(packageDetail!.name);
  const stars = await fetchRepoDetails(packageDetail!.githubRepoName)
  const results = {
    ...packageDetail,
    weeklyDownloads: formatNumber(weeklyDownloads),
    stars:formatNumber(stars)
  };
  console.log("result", results);
  return results;
};

export async function GET() {
  const results = await Promise.all(repos.map(repo => getData(repo)));
  return new Response(JSON.stringify(groupBy(results, "tag")), {
    headers: {
      "content-type": "application/json"
    }
  });
}
