import { Panel } from "../components/panel";

export default async function Page(props: any) {

  return (
    <main>
       <Panel type={props.params.stack} />
    </main>
  );
}
