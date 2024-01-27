import { getOnePostData } from "@/lib/post";

export async function GET(request: Request) {
  const data = getOnePostData("hello-world");
  console.log("md-========================", data);
  return new Response(JSON.stringify({ md: data.content, r: request.url }), {
    headers: { "content-type": "application/json" },
  });
}
