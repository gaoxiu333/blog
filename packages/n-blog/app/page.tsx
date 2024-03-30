import { ArticlesList } from "@/components/Articles";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default async function Home() {
  return (
    <>
      <Card className="container">
        <CardHeader className="text-default-500">追踪我的常用堆栈</CardHeader>
        <CardBody>...</CardBody>
      </Card>
      <ArticlesList />
    </>
  );
}
