import { getAllStack } from "./handler";


export async function GET(request: Request, context: any) {
  const searchParams = new URL(request.url).searchParams;
  const tag = searchParams.get("tag") || "";
  const data = await getAllStack(tag);
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
