import { getHost } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

const getData = async (id: string) => {
  const res = await fetch(`${getHost()}/api/article?id=${id}`);
  return await res.json();
};

// 自定义组件样式，现在使用的是 tailwindcss，所以不需要这个了。
const components = {
  h1: (props: any) => <h1 {...props}>{props.children}</h1>,
};

const Page = async (props: any) => {
  const data = await getData(props.params.id);
  // TODO serialize 有什么作用？当前使用nextjs的服务端渲染，已经不需要这个方法了。
  // const source = await serialize(data.md);
  return (
    <article>
      Post:{props.params.id}
      <MDXRemote
        source={data.md}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm as any],
            rehypePlugins: [rehypePrism as any],
          },
        }}
      />
      {/* <MDXRemote
        source={`# Hello World
      This is from Server Components!
    `}
      /> */}
    </article>
  );
};

export default Page;
