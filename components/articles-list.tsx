import { getAllArticlesMatter } from "@/lib/articles";
import { Card, CardBody } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";

const ArticlesList: React.FC = async () => {
  const list = await getAllArticlesMatter();
  return (
    <>
      <ul className="container mt-9 flex flex-col gap-8">
        {list.map(({ frontmatter, readingTime, fileName }, idx) => {
          return (
            <li key={idx}>
              <Card className="py-3 bg-white/5" isHoverable>
                <Link
                  className="text-xl text-default-600/90 transition duration-300 line-clamp-2 "
                  href={`/articles/${fileName}`}
                >
                  <CardBody>
                    {frontmatter.title}
                    <p className="mt-1 text-sm text-default-400">
                      <span>
                        {dayjs(frontmatter.createdAt).format("YYYY-MM-DD")}
                      </span>{" "}
                      · <span>{readingTime}</span>
                    </p>
                    <p className="mt-2 text-base">
                      {frontmatter.description}
                    </p>
                  </CardBody>
                </Link>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export { ArticlesList };
