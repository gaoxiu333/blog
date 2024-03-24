import Link from "next/link";
import { getHost } from "@/lib/utils";

const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  return await res.json();
};
export default async function Home() {
  const list = await getPosts();
  return (
    <ul className="container mt-9">
      {list.map((item: any, idx: number) => {
        return (
          <li key={idx} className='py-1 cursor-pointer'>
            <Link
              prefetch={true}
              href={`/posts/${item.id}`}
              className="text-1xl cursor-pointer font-bold leading-relaxe"
            >
              {item.id}
            </Link>
            <div>
              <p className="text-xs text-gray-400">
                {12} · {333}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
