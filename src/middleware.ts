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
  "/",
  "/mobile/",
  "/login",
  "/signup",
  "/welcome",
  "/mobile/login",
  "/mobile/signup",
  "/mobile/welcome",
];

const redirectTo = (url: string, req: NextRequest) =>
  NextResponse.redirect(new URL(url, req.url));

const getRedirectPath = (route: Route, isMobileDevice: boolean) =>
    isMobileDevice ? getMobileRoute(route) : route;

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
    return redirectTo(getRedirectPath(Route.HOME, <boolean>isMobileDevice), req);
  }

  if (!token && !isPublicPath && !isAPIRoute(pathname)) {
    if (pathname === MOBILE_HOME_PAGE || pathname === DESKTOP_HOME_PAGE) {
      return NextResponse.next();
    }
    return redirectTo(getRedirectPath(Route.LOGIN, <boolean>isMobileDevice), req);
  }

  return NextResponse.next();
}
