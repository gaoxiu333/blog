import { ArticlesList } from "@/components/Articles";
import { Log } from "@/components/log";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";

const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-cache",
  });

  return await res.json();
};
export default async function Home() {
  return (
    <>
      <Card className="container">
        <CardHeader>我的堆栈</CardHeader>
        <CardBody>...</CardBody>
      </Card>
      <ArticlesList />
    </>
  );
}
