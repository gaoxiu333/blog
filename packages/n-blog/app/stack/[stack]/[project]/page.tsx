import { StackList } from "../../components/stackCard";
import { TAG_MAP } from "@/prisma/_constant";

export default async function Project(props: any) {
  return (
    <section className="flex-1">
      {TAG_MAP.filter((item) => item.key === props.params.project).map(
        (item) => {
          return (
            <StackList
              key={item.key}
              name={item.name}
              tag={item.key}
              stack={props.params.stack || "all"}
              project={props.params.project}
            />
          );
        },
      )}
    </section>
  );
}
