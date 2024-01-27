import { getOnePostData } from "@/lib/post";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("quest", request);
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data = getOnePostData(id!);
  return new Response(JSON.stringify({ md: data.content, r: request.url }), {
    headers: { "content-type": "application/json" },
  });
}
