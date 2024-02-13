import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.stack.findMany();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json"
    }
  });
}