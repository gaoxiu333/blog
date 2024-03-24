import { getOnePostData } from "@/lib/post";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data = getOnePostData(id!);
  return new Response(
    JSON.stringify({
      mdCode: data.mdCode,
      doc: "",
      matter: data.matter,
      r: request.url,
    }),
    {
      headers: { "content-type": "application/json" },
    },
  );
}
