import { Divider } from "@nextui-org/react";
import { Log } from "@/components/log";
import _ from "lodash";
import { ALL_TAG } from "@/prisma/_constant";
import { Panel } from "./components/panel";

export default async function Page() {
  return (
    <main>
      <Divider />
      <Log info={ALL_TAG} />
      <div className="py-6">
        <Panel type="all" />
      </div>
    </main>
  );
}
