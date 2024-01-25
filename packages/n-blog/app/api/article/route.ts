export async function GET(request: Request) {
  return new Response(JSON.stringify({ md: "# hello world", r: request.url }), {
    headers: { "content-type": "application/json" },
  });
}
