import { Log } from "@/components/log";
import Link from "next/link";

const getPosts = async () => {
  console.log("fetch");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-cache",
  });

  return await res.json();
};
export default async function Home() {
  const list = await getPosts();

  return (
    <ul className="container mt-9">
      <Log info={list} />
      {list.map((item: any, idx: number) => {
        return (
          <li key={idx} className="cursor-pointer py-1">
            <Link
              prefetch={true}
              href={`/posts/${item.id}`}
              className="text-1xl leading-relaxe cursor-pointer font-bold"
            >
              {item.title}
            </Link>
            <div>
              <p className="text-xs text-gray-400">
                {item.createdAt} · {item.readingTime}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
