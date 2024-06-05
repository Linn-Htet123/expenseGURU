import { NextRequest } from "next/server";

export const chunkUrl = async (request: NextRequest): Promise<string> => {
  const url = await request.nextUrl;
  const pathname = url.pathname;
  const id = pathname.split("/").pop()!;
  return id;
};
