export function GET(request: Request, context: any) {
  return new Response(JSON.stringify({}), {
    headers: {
      "content-type": "application/json",
    },
  });
}
