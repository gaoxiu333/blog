import _ from "lodash";

// 获取 npm 的最新版本以及更新时间
async function fetchNpmInfo(npm: string) {
  const response = await fetch(`https://registry.npmjs.org/${npm}`);
  const metadata = await response.json();
  const version = metadata["dist-tags"].latest;
  const updateAt = metadata.time[version];
  const createdAt = metadata.time.created;
  console.log('time',createdAt)
  // const repo = _.chain(metadata.repository.url)
  //   .replace(".git", "")
  //   .split("/")
  //   .takeRight(2)
  //   .join("/")
  //   .value();
  return { updateAt, createdAt, version };
}

async function fetchDownloads(packageName: string) {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${packageName}`,
  );
  const result = await response.json();
  const { downloads } = result;
  return { downloads };
}

export const fetchNpmDetails = async ({ npm, name }: any) => {
  const npmInfo = await fetchNpmInfo(npm);
  const npmDownloads = await fetchDownloads(npm);
  return { ...npmInfo, ...npmDownloads, name };
};
