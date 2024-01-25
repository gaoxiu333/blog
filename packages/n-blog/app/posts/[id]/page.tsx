import { getHost } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";

const getData = async (id: string) => {
  const res = await fetch(`${getHost()}/api/article`);
  return await res.json();
};

const Page = async (props: any) => {
  const data = await getData(props.params.id);
  return (
    <div>
      Post:{props.params.id},{data.md}
      <MDXRemote source={data.md} />
    </div>
  );
};

export default Page;
