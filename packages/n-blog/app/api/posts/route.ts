import { getSortedPostsData } from "@/lib/post";

export async function GET(request: Request) {
  const data = getSortedPostsData();
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}
