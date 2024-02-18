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
async function featchRepoInfo({ repo, name }: { repo: string; name: string }) {
  const response = await fetch(
    `https://api.github.com/repos/${repo}`,
    fetchConfig,
  );
  const commit = await fetchCommit(repo);
  const contributor = await fetchContributors(repo);
  const data = await response.json();
  console.log('time',name,data.create_at)
  const {
    created_at: createdAt,
    updated_at: updateAt,
    language,
    issues_url: issuesLink,
    open_issues_count: issues,
    stargazers_count: stars,
    description,
  } = data;
  const result = {
    name,
    createdAt,
    updateAt,
    version: "0.0.0",
    stars,
    ...commit,
    ...contributor,
    issues,
    issuesLink,
    description,
    language,
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
  const contributors = contributorsLastPageMatch
    ? Number(contributorsLastPageMatch[1])
    : 0;
  return { contributors };
}

// 获取Github提交数量
async function fetchCommit(repo: string) {
  const commitsResponse = await fetch(
    `https://api.github.com/repos/${repo}/commits?per_page=1`,
    fetchConfig,
  );
  const commitsLink = commitsResponse.headers.get("link");
  const commitsLastPageMatch = commitsLink!.match(/&page=(\d+)>; rel="last"/);
  const commits = commitsLastPageMatch ? Number(commitsLastPageMatch[1]) : 0;
  return { commits };
}

// 获取Github信息
async function fetchGithubInfo(stack: any) {
  const result = await featchRepoInfo(stack);
  return result;
}

export { fetchGithubInfo };
