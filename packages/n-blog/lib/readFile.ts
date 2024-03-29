import fs from "node:fs/promises";
import path from "path";

const articlesDirectory = path.join(process.cwd(), "app/_articles");

// 读取文章目录内的所有文名
export async function readAllMdxFileNames() {
  const files = await fs.readdir(articlesDirectory);
  return files.map((fileName) => fileName.split(".md").at(0));
}

// 通过文件名读取文章内容
export async function readMdxFile(fileName: string) {
  console.log("file", fileName);
  let fullPath = path.join(articlesDirectory, `${fileName}`);
  try {
    const stars = await fs.stat(fullPath);
    fullPath = stars.isDirectory() ? path.join(fullPath, "index") : fullPath;
  } catch (error) {}

  let suffix = "mdx";
  try {
    const stars = await fs.stat(`${fullPath}.${suffix}`);
    suffix = stars.isFile() ? "mdx" : "md";
  } catch (error) {
    suffix = "md";
  }
  const source = await fs.readFile(`${fullPath}.${suffix}`, "utf8");
  return { source, fullPath: `${fullPath}${suffix}` };
}

// 读取所有文章内容
export async function readAllMdxFiles() {
  const fileNames = await readAllMdxFileNames();
  const allMdxFiles = await Promise.all(
    fileNames.map((fileName) => readMdxFile(fileName!)),
  );
  return allMdxFiles;
}
