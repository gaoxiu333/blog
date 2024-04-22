import {
  MarkerFilter,
  MarkerLink,
  UnderlineLink,
} from "@/client/components/component-demo";

const Page = () => {
  return (
    <>
      <h1>Demo</h1>
      <MarkerFilter />
      <div className="flex gap-3">
        <MarkerLink href="#">我</MarkerLink>
        <MarkerLink href="#">是</MarkerLink>
        <MarkerLink href="#">链接</MarkerLink>
      </div>
      <div>
        <UnderlineLink href="#">我是也是链接</UnderlineLink>
      </div>
    </>
  );
};

export default Page;
