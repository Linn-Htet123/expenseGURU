import {
  API_ROUTE,
  MOBILE_HOME_PAGE,
  TEST_MOBILE_REGEX,
} from "@/constants/frontend/route";
import { Route } from "@/enums/route";
export const isMobileRoute = (path?: string) => {
  return path?.includes(MOBILE_HOME_PAGE);
};

export const isAPIRoute = (path?: string) => {
  const currentPath =
    path || (typeof window !== "undefined" && window.location.pathname);
  return currentPath ? currentPath.includes(API_ROUTE) : false;
};

export const isMobile = (userAgent?: string) => {
  if (typeof window !== "undefined") {
    return TEST_MOBILE_REGEX.test(navigator.userAgent);
  }
  return userAgent && TEST_MOBILE_REGEX.test(userAgent);
};

export const getMobileRoute = (path: Route) => {
  return `${Route.MOBILE}/${path}`;
};
