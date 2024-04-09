import { ArticlesList } from "@/components/Articles";
import { HomePanle } from "@/components/HomePanle";

export default async function Home() {
  return (
    <>
      <HomePanle />
      <ArticlesList />
    </>
  );
}
