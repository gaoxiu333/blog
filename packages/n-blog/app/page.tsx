import { Log } from "@/components/log";
import { getAllArticlesData } from "@/lib/mdx";
import dayjs from "dayjs";
import Link from "next/link";

const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-cache",
  });

  return await res.json();
};
export default async function Home() {
  const data = getAllArticlesData();

  return (
    <ul className="container mt-9">
      {data.map(({ fileName, frontmatter, readingTime }, idx) => {
        return (
          <div className="py-3" key={idx}>
            <Link className="text-2xl font-bold" href={`/articles/${fileName}`}>
              {frontmatter.title}
            </Link>
            <p className="mt-1 text-sm text-default-400">
              <span>{dayjs(frontmatter.createdAt).format("YYYY-MM-DD")}</span> ·{" "}
              <span>{readingTime}</span>
            </p>
          </div>
        );
      })}
    </ul>
  );
}
