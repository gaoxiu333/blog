import { Panel } from "../components/panel";

export default async function Page(props: any) {
  return (
    <main>
      <h1>stack{props.params.stack}</h1>
      <Panel type={props.params.stack} />
    </main>
  );
}
