// import { githubToken } from "../_keys";
const githubToken =
  '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';
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
  console.log('开始获取github仓库信息', repo, name);
  const response = await fetch(
    `https://api.github.com/repos/${repo}`,
    fetchConfig,
  );
  const commit = await fetchCommit(repo);
  await new Promise((resolve) => setTimeout(resolve, 300));

  const contributor = await fetchContributors(repo);
  await new Promise((resolve) => setTimeout(resolve, 300));

  const data = await response.json();
  const {
    created_at: createdAt,
    updated_at: updatedAt,
    language,
    issues_url: issuesLink,
    open_issues_count: issues,
    stargazers_count: stars,
    description,
    organization,
    owner,
  } = data;
  const result = {
    name,
    createdAt,
    updatedAt,
    version: '0.0.0',
    stars,
    ...commit,
    ...contributor,
    issues,
    issuesLink,
    description,
    language,
    organizationAvatar: organization?.avatar_url || owner?.avatar_url || '',
  };
  return result;
}

/**
 * 获取github贡献人数
 * 但是不准确，通常只记录500人，超过500人，记录为匿名贡献者，获取不到
 * 加上 anon 字段，可以获取匿名贡献者，但是数量对不上，会比实际贡献者多。
 */
async function fetchContributors(repo: string) {
  console.log('开始获取github贡献人数', repo);
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contributors?per_page=1`,
    fetchConfig,
  );
  const contributorsLink = response.headers.get('link');
  if (!contributorsLink) return { contributors: 0 };
  const contributorsLastPageMatch = contributorsLink!.match(
    /&page=(\d+)>; rel="last"/,
  );
  const contributors = contributorsLastPageMatch
    ? Number(contributorsLastPageMatch[1])
    : 0;
  await new Promise((resolve) => setTimeout(resolve, 300));

  return { contributors };
}

// 获取Github提交数量
async function fetchCommit(repo: string) {
  console.log('开始获取github提交数量', repo);
  const commitsResponse = await fetch(
    `https://api.github.com/repos/${repo}/commits?per_page=1`,
    fetchConfig,
  );
  const commitsLink = commitsResponse.headers.get('link');
  console.log('commitsLink', commitsLink);
  if (!commitsLink) return { commits: 0 };
  const commitsLastPageMatch = commitsLink!.match(/&page=(\d+)>; rel="last"/);
  const commits = commitsLastPageMatch ? Number(commitsLastPageMatch[1]) : 0;
  await new Promise((resolve) => setTimeout(resolve, 300));

  return { commits };
}

// 获取Github信息
async function fetchGithubInfo(stack: any) {
  const result = await featchRepoInfo(stack);
  return result;
}

export { fetchGithubInfo };
