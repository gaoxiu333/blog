import { getHost } from "@/lib/utils";
import { Item } from "./components/item";
import { Button } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";
import { RefreshBtn } from "@/app/stack/components/refreshBtn";

const getData = async () => {
  const res = await fetch(`${getHost()}/api/stack`);
  return await res.json();
};
export default async function Stack() {
  const data = await getData() || [];
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