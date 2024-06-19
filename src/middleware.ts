import { NextRequest, NextResponse } from "next/server";
import {
  isAPIRoute,
  isMobileRoute,
  isMobile,
  getMobileRoute,
} from "./utils/frontend/route";
import {
  MOBILE_HOME_PAGE,
  DESKTOP_HOME_PAGE,
} from "@/constants/frontend/route";
import { Route } from "./enums/route";

const publicPaths = [
  "/login",
  "/signup",
  "/welcome",
  "/mobile/login",
  "/mobile/signup",
  "/mobile/welcome",
];

const redirectTo = (url: string, req: NextRequest) =>
  NextResponse.redirect(new URL(url, req.url));

export default async function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") ?? "";
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value ?? "";
  const isPublicPath = publicPaths.includes(pathname);
  const isMobileDevice = isMobile(userAgent);

  if (!isAPIRoute(pathname)) {
    if (isMobileDevice && !isMobileRoute(pathname)) {
      return redirectTo(MOBILE_HOME_PAGE, req);
    } else if (!isMobileDevice && isMobileRoute(pathname)) {
      return redirectTo(DESKTOP_HOME_PAGE, req);
    }
  }
  if (isPublicPath && token) {
    const redirectPath = `${
      isMobileDevice ? getMobileRoute(Route.HOME) : Route.HOME
    }`;
    return redirectTo(redirectPath, req);
  }

  if (!token && !isPublicPath && !isAPIRoute(pathname)) {
    if (pathname === MOBILE_HOME_PAGE || pathname === DESKTOP_HOME_PAGE) {
      return NextResponse.next();
    }
    const redirectPath = `${
      isMobileDevice ? getMobileRoute(Route.LOGIN) : Route.LOGIN
    }`;
    return redirectTo(redirectPath, req);
  }

  return NextResponse.next();
}
