import { ArticlesList } from "@/components/articles-list";
import { HomeBanner } from "@/components/home-banner";

export default async function Home() {
  return (
    <>
      <HomeBanner />
      <ArticlesList />
    </>
  );
}
