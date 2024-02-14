import _ from "lodash";

// 获取 npm 的最新版本以及更新时间
async function fetchNpmInfo(packageName: string) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const metadata = await response.json();
  const { name } = metadata;
  const latestVersion = metadata["dist-tags"].latest;
  const updateTime = metadata.time[latestVersion];
  const repo = _.chain(metadata.repository.url).replace(".git", "").split("/").takeRight(2).join("/").value();
  return { updateTime, latestVersion, name, repo };
}

async function fetchDownloads(packageName: string) {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`);
  const result = await response.json();
  const { downloads } = result;
  return { downloads };
}

export const fetchNpmDetails = async (packageName: string) => {
  const npmInfo = await fetchNpmInfo(packageName);
  const npmDownloads = await fetchDownloads(packageName);
  return { ...npmInfo, ...npmDownloads };
};

