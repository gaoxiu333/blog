import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "app/_posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map(getMatterData)
    .map((item) => item.matter)
    .sort((a: any, b: any) => {
      return a?.createdAt < b?.createdAt ? 1 : -1;
    });
}

export function getOnePostData(id: string) {
  const { mdCode, matter } = getMatterData(`${id}.md`);
  return {
    matter: matter,
    mdCode: mdCode,
  };
}

function getMatterData(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContnts = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContnts);
  const { createdAt } = matterResult as any;
  const id = fileName.replace(/\.md$/, "");
  return {
    mdCode: fileContnts,
    matter: {
      id,
      ...matterResult.data,
      createdAt: dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
      readingTime: readingTime(matterResult.content).text,
    },
  };
}
