import { Log } from "@/components/log";
import { getHost } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

const getData = async (id: string) => {
  const res = await fetch(`${getHost()}/api/article?id=${id}`, {
    cache: "no-cache",
  });
  return await res.json();
};

// 自定义组件样式，现在使用的是 tailwindcss，所以不需要这个了。
const components = {
  h1: (props: any) => <h1 {...props}>{props.children}</h1>,
};

const Page = async (props: any) => {
  const { mdCode, matter } = await getData(props.params.id);
  return (
    <main className="container">
      <Log info={matter} />

      <header>
        <h2 className="text-center text-3xl font-black text-default-700">
          {matter.title}
        </h2>
        <p className="text-center text-sm  text-default-400">
          {matter.createdAt} · {matter.readingTime}
        </p>
      </header>

      <article className="prose dark:prose-invert">
        <MDXRemote
          source={mdCode}
          components={components}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [remarkGfm as any],
              rehypePlugins: [rehypePrism as any],
            },
          }}
        />
      </article>
    </main>
  );
};

function OldHeaderPanle() {
  return (
    <>
      <div
        className="border border-sky-100 bg-sky-100 dark:border-sky-950 dark:bg-sky-950"
        style={{ height: "100px", marginTop: "-100px" }}
      ></div>
      <header className="h-64 bg-sky-100 dark:bg-sky-950">
        <div
          className="sticky top-0 bg-sky-100 dark:bg-sky-950"
          style={{ height: "64px" }}
        ></div>
      </header>
    </>
  );
}

export default Page;
