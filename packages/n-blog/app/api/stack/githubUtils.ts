import { githubToken } from "@/_keys";

const fetchConfig = {
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
  next: {
    revalidate: 1000 * 10,
  },
};

// 获取Github仓库信息
async function featchRepoInfo(repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${repo}`,
    fetchConfig,
  );
  const data = await response.json();
  const {
    // updated_at: updateDate,
    language,
    issues_url: issuesUrl,
    open_issues_count: openIssuesCount,
    stargazers_count: stars,
    homepage,
    license,
    description,
    created_at: createdDate,
  } = data;
  const result = {
    // updateDate,
    language,
    issuesUrl,
    openIssuesCount,
    stars,
    homepage,
    // license,
    description,
    createdDate,
  };
  return result;
}

/**
 * 获取github贡献人数
 * 但是不准确，通常只记录500人，超过500人，记录为匿名贡献者，获取不到
 * 加上 anon 字段，可以获取匿名贡献者，但是数量对不上，会比实际贡献者多。
 */
async function fetchContributors(repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contributors?per_page=1`,
    fetchConfig,
  );
  const contributorsLink = response.headers.get("link");
  const contributorsLastPageMatch = contributorsLink!.match(
    /&page=(\d+)>; rel="last"/,
  );
  const contributorsCount = contributorsLastPageMatch
    ? Number(contributorsLastPageMatch[1])
    : 0;
  return { contributorsCount };
}

// 获取Github提交数量
async function fetchCommit(repo: string) {
  const commitsResponse = await fetch(
    `https://api.github.com/repos/${repo}/commits?per_page=1`,
    fetchConfig,
  );
  const commitsLink = commitsResponse.headers.get("link");
  const commitsLastPageMatch = commitsLink!.match(/&page=(\d+)>; rel="last"/);
  const commitsCount = commitsLastPageMatch
    ? Number(commitsLastPageMatch[1])
    : 0;
  return { commitsCount };
}

// 获取Github信息
async function fetchGithubInfo(repo: string) {
  const [result1, result2, result3] = await Promise.all([
    featchRepoInfo(repo),
    fetchContributors(repo),
    fetchCommit(repo),
  ]);
  return { ...result1, ...result2, ...result3 };
}

export { fetchGithubInfo };
