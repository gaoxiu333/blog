export function GET(request: Request, context: any) {
  console.log("params", context);
  return new Response(JSON.stringify({}), {
    headers: {
      "content-type": "application/json"
    }
  });

}

