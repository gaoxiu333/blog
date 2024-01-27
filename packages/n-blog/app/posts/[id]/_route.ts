import { getOnePostData } from "@/lib/post";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id; // 'a', 'b', or 'c'
  const data = getOnePostData(id);
  return new Response(JSON.stringify({ md: data.content, r: request.url }), {
    headers: { "content-type": "application/json" },
  });
}
