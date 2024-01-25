export async function GET(request: Request) {
  console.log("===============get", request);
  return new Response(JSON.stringify({ hello: "world" }), {
    headers: { "content-type": "application/json" },
  });
}
