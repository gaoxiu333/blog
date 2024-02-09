import { getHost } from "@/lib/utils";
import { Download, Star, Stars } from "lucide-react";


const getData = async () => {
  const res = await fetch(`${getHost()}/api/stack`);
  return await res.json();
};
export default async function Stack() {
  const data = await getData() || [];
  const list = Object.keys(data)

  return <div className="container flex flex-col gap-3 p-1">
    <h1 className='text-3xl text-center font-bold'>我的堆栈</h1>
    {list.map((item,idx)=> {
      return <section key={idx} className='flex-1'>
        <h2 className="text-xl font-bold py-3">{item}</h2>
        {data[item].map((item:any,idx:number)=>{
          return <div key={item.name + idx} className='flex items-center gap-2'>
            <span className='font-bold'>{item.name}</span>
            <span className='text-sm flex gap-1 items-center'><Star size={14} /> {item.stars}</span>
            <span className='text-sm flex gap-1 items-center'><Download size={14} /> {item.weeklyDownloads}</span>
          </div>
        })}
      </section>;
    })}
  </div>;
}