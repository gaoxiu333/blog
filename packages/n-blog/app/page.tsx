import { Card, CardBody, Button } from "@nextui-org/react";
import { Button as SButton } from "@/components/ui/button";
import { getHost } from "@/lib/utils";

const getPosts = async () => {
  const res = await fetch(`${getHost()}/api/posts`);

  return await res.json();
  // return posts;
};

export default async function Home() {
  const list = await getPosts();
  return (
    <div className="container mt-9">
      <Card>
        {list.map((item: any, idx: number) => {
          return (
            <CardBody key={idx}>
              <h3 className="font-bold">{item.id}</h3>
              {/* <p className="text-sm">{item.date}</p> */}
            </CardBody>
          );
        })}
      </Card>
    </div>
  );
}
