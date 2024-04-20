import { ArticlesList } from "@/components/Articles";
import { HomeBanner } from "@/components/home-banner";

export default async function Home() {
  return (
    <>
      <HomeBanner />
      <ArticlesList />
    </>
  );
}
