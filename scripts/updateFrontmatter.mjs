import fs from "fs/promises";
import matter from "gray-matter";

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv;
  console.log("mdFilePaths", mdFilePaths, process.argv);
  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    if (currentFrontmatter.published === true) {
      const updatedFrontmatter = {
        ...currentFrontmatter,
        updatedAt: new Date().toISOString(),
      };
      file.data = updatedFrontmatter;
      const updatedFileContent = matter.stringify(file);
      fs.writeFile(path, updatedFileContent);
    }
  });
};

updateFrontmatter();
