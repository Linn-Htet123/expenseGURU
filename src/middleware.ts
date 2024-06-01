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

const publicPath = [
  "/login",
  "/signup",
  "/welcome",
  "/mobile/login",
  "/mobile/signup",
  "/mobile/welcome",
];

const redirectToMobileHomePage = (req: NextRequest) => {
  return NextResponse.redirect(new URL(MOBILE_HOME_PAGE, req.url));
};

const redirectToDesktopHomePage = (req: NextRequest) => {
  return NextResponse.redirect(new URL(DESKTOP_HOME_PAGE, req.url));
};

export default async function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent");
  const pathname = new URL(req.url).pathname;

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value || "";
  const isPublicPath = publicPath.includes(pathname);

  if (isPublicPath && token) {
    if (isMobile(userAgent!)) {
      return NextResponse.redirect(new URL("/mobile/home", req.url));
    } else {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (!isAPIRoute(pathname)) {
    if (isMobile(userAgent!) && !isMobileRoute(pathname)) {
      return redirectToMobileHomePage(req);
    } else if (!isMobile(userAgent!) && isMobileRoute(pathname)) {
      return redirectToDesktopHomePage(req);
    }
  }

  return NextResponse.next();
}
