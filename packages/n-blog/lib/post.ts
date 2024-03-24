import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "app/_posts");

export function getSortedPostsData() {
  // 获取博客的文件名
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    // 读取md文件内容为字符串
    const fullPath = path.join(postsDirectory, fileName);
    const fileContnts = fs.readFileSync(fullPath, "utf8");
    // 使用gray-matter解析md文件元数据部分
    const matterResult = matter(fileContnts);
    const { createdAt } = matterResult as any;
    return {
      id,
      ...matterResult.data,
      createdAt: dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
      readingTime: readingTime(matterResult.content).text,
    };
  });
  return allPostsData.sort((a: any, b: any) => {
    return a?.createdAt < b?.createdAt ? 1 : -1;
  });
}

export function getOnePostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContnts = fs.readFileSync(fullPath, "utf8");
  // const matterResult = matter(fileContnts);
  return {
    id,
    content: fileContnts,
  };
}
