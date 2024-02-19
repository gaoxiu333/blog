import { Divider } from "@nextui-org/react";
import _ from "lodash";
import { Panel } from "./components/panel";

export default async function Page() {
  return (
    <main>
      <Divider />
      <div className="py-6">我的堆栈</div>
    </main>
  );
}
