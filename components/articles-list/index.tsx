import { getAllArticlesMatter } from "@/lib/articles";
import { Card, CardBody } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";
import { ArticleItem } from "./article-item";

const ArticlesList = async () => {
  const list = await getAllArticlesMatter();
  return (
    <>
      <ul className="container mt-9 flex flex-col gap-8">
        {list.map(({ frontmatter, readingTime, fileName }, idx) => {
          return (
            <li key={idx}>
              <ArticleItem
                frontmatter={frontmatter}
                readingTime={readingTime}
                fileName={fileName}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export { ArticlesList };
