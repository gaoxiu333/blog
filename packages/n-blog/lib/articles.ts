import matter from "gray-matter";
import { readAllMdxFileNames, readMdxFile } from "./readFile";
import readingTime from "reading-time";

// 获取文章元数据
export async function getArticlesMatter(fileName: string) {
  const { source } = await readMdxFile(fileName);
  const { content, data } = matter(source);
  const { text: readTime } = readingTime(content);
  return { ...data, readingTime: readTime, fileName, content } as ArticleMatter;
}

interface ArticleMatter {
  sulg?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  readingTime?: string;
  fileName: string;
  content: string;
}
// 获取所有文章的元数据
export async function getAllArticlesMatter() {
  const fileNames = await readAllMdxFileNames();
  const allMdxFiles = await Promise.all(
    fileNames.map((fileName) => getArticlesMatter(fileName!)),
  );
  return allMdxFiles as ArticleMatter[];
}
