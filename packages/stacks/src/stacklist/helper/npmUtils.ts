import _ from 'lodash';

// 获取 npm 的最新版本以及更新时间
async function fetchNpmInfo(npm: string) {
  console.log('开始获取npm信息', npm);
  const response = await fetch(`https://registry.npmjs.org/${npm}`);
  const metadata = await response.json();
  const version = metadata['dist-tags'].latest;
  const updatedAt = metadata.time[version];
  const createdAt = metadata.time.created;
  // const repo = _.chain(metadata.repository.url)
  //   .replace(".git", "")
  //   .split("/")
  //   .takeRight(2)
  //   .join("/")
  //   .value();
  return { updatedAt, createdAt, version };
}

async function fetchDownloads(packageName: string) {
  console.log('开始获取npm下载量', packageName);
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${packageName}`,
  );
  const result = await response.json();
  const { downloads } = result;
  console.log('npm下载量', downloads);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return { downloads };
}

export const fetchNpmDetails = async ({ npm, name }: any) => {
  const npmInfo = await fetchNpmInfo(npm);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const npmDownloads = await fetchDownloads(npm);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ...npmInfo, ...npmDownloads, name };
};
