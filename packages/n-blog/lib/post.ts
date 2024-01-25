import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a: any, b: any) => {
    return a?.date < b?.date ? 1 : -1;
  });
}
