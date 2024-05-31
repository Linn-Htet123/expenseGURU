import { NextRequest } from "next/server";

export const logger = async (req: NextRequest) => {
  console.log(`Request: ${req.method} ${req.url}`);
};
