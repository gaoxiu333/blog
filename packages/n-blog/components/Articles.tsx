import { getAllArticlesMatter } from "@/lib/articles";
import dayjs from "dayjs";
import Link from "next/link";

const ArticlesList: React.FC = async () => {
  const list = await getAllArticlesMatter();
  return (
    <>
      <ul className="container mt-9">
        {list.map(({ fileName, title, createdAt, readingTime }, idx) => {
          return (
            <div className="py-3" key={idx}>
              <Link
                className="text-2xl font-bold"
                href={`/articles/${fileName}`}
              >
                {title}
              </Link>
              <p className="mt-1 text-sm text-default-400">
                <span>{dayjs(createdAt).format("YYYY-MM-DD")}</span> ·{" "}
                <span>{readingTime}</span>
              </p>
            </div>
          );
        })}
      </ul>
    </>
  );
};
export { ArticlesList };
