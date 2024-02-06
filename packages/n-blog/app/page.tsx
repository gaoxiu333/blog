import Link from 'next/link'
import { getHost } from "@/lib/utils";

const getPosts = async () => {
  const res = await fetch(`${getHost()}/api/posts`);

  return await res.json();
};
export default async function Home() {
  const list = await getPosts();
  return (
    <div className="container mt-9">
      {list.map((item: any, idx: number) => {
        return (
          <h3  key={idx}>
            <Link prefetch={true} href={`/posts/${item.id}`} className='font-bold text-2xl leading-relaxed cursor-pointer hover:accent-red-500'>
              {item.id}
            </Link>
          </h3>
        );
      })}
    </div>
  );
}
