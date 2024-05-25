import { NextRequest, NextResponse } from "next/server";
import { isAPIRoute, isMobileRoute, isMobile } from "./utils/route";
import { MOBILE_HOME_PAGE, DESKTOP_HOME_PAGE } from "@/constants/route";

export default async function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent");

  const pathname = new URL(req.url).pathname;

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (!isAPIRoute(pathname)) {
    if (isMobile(userAgent!) && !isMobileRoute(pathname)) {
      return NextResponse.redirect(new URL(MOBILE_HOME_PAGE, req.url));
    } else if (!isMobile(userAgent!) && isMobileRoute(pathname)) {
      return NextResponse.redirect(new URL(DESKTOP_HOME_PAGE, req.url));
    }
  }
  return NextResponse.next();
}
