import { getAllArticles, getArticleDetails } from "@/lib/articles";
import { ArticlesDetails } from "./components/articles-details";
import { ArticlesToc } from "./components/articles-toc";
import dayjs from "dayjs";
import { MarkerFilter } from "./components/code-line";
// import '@/styles/mdx.css'

export async function generateStaticParams() {
  const list = await getAllArticles();
  return list;
}

const Page = async ({ params }: any) => {
  const { frontmatter, readingTime, code, TOC } = await getArticleDetails(
    decodeURIComponent(params.id)
  );
  const minDepth = Math.min(...TOC.map((item: any) => item.depth));
  return (
    <main className="container">
      <header className="my-6">
        <h2 className="text-center text-3xl font-black text-default-700">
          {frontmatter.title}
        </h2>
        <p className="text-center text-sm  text-default-400">
          {dayjs(frontmatter.createdAt).format("YYYY年MM月DD日 HH:mm:ss")} ·{" "}
          {readingTime}
        </p>
      </header>
      {TOC.length > 0 && <ArticlesToc TOC={TOC} minDepth={minDepth} />}
      <ArticlesDetails content={code} />
      <MarkerFilter />
    </main>
  );
};

export default Page;
