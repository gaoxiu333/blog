import { getHost } from "@/lib/utils";
import { Log } from "@/components/log";
import { Item } from "./components/item";

const getData = async () => {
  const res = await fetch(`${getHost()}/api/follow`);
  return await res.json();
};
export default async function Stack() {
  const data = await getData() || [];
  const list = Object.keys(data)

  return <div className="container flex flex-col gap-3 p-1">
    {list.map((item,idx)=> {
      return <section key={idx} className='flex-1'>
        <h2 className="text-xl font-bold py-3">{item}</h2>
        <Item data={data[item]} />
      </section>;
    })}
  </div>;
}