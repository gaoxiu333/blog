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
                <CardBody>
                  <Link
                    className="text-xl text-default-500/90 transition duration-300 line-clamp-2 hover:text-rose-100/90"
                    href={`/articles/${fileName}`}
                  >
                    {frontmatter.title}
                  </Link>
                  <p className="mt-1 text-sm text-default-400">
                    <span>
                      {dayjs(frontmatter.createdAt).format("YYYY-MM-DD")}
                    </span>{" "}
                    · <span>{readingTime}</span>
                  </p>
                </CardBody>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export { ArticlesList };
