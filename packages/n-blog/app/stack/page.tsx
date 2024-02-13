import { Item } from "./components/item";
import { Chip, Divider } from "@nextui-org/react";
import { RefreshBtn } from "@/app/stack/components/refreshBtn";
import { getHost } from "@/lib/utils";

const getData = async (tag: string) => {
  const res = await fetch(`${getHost()}/api/projects/${tag}`);
  return await res.json();
};

async function Stack({ tag }: { tag: string }) {
  const data = await getData(tag) || [];
  const list = Object.keys(data);

  return <div className="container flex flex-col gap-3 p-1">
    <div className="flex justify-end"><RefreshBtn /></div>
    {list.map((item, idx) => {
      return <section key={idx} className="flex-1">
        <h2 className="text-xl font-bold py-3">{item}</h2>
        <Item data={data[item]} />
      </section>;
    })}
  </div>;
}

const getDOC = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/projectDOC`);
  return await data.json();
};
export default async function Page() {
  const list = await getDOC();
  return <main>
    <div className="q flex gap-2 pt-2.5">

    </div>
    <Divider />
    <h1>{process.env.BASE_URL}</h1>
    {/*<Stack tag={""} />*/}
  </main>;
}