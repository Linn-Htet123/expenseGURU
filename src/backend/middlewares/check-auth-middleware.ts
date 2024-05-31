import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../helpers/password";

export const checkUser = async (req: NextRequest) => {
  const _id = await getDataFromToken(req);
  req.headers.set("x-user-id", _id);
  return NextResponse.next();
};
