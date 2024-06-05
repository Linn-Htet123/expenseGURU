import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../helpers/password";

export const checkUser = async (req: NextRequest) => {
  const _id: string = await getDataFromToken(req);
  req.headers.set("userId", _id);
  return NextResponse.next();
};
