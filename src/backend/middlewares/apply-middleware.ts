import { NextRequest, NextResponse } from "next/server";
import { HttpUnauthorizedHandler } from "../helpers/httpExceptionHandler";
import { checkUser } from "./check-auth-middleware";

export const applyMiddleware = (middleware: Function[], handler: Function) => {
  return async (req: NextRequest) => {
    for (const fn of middleware) {
      try {
        await fn(req);
      } catch (error) {
        if (fn.name === checkUser.name) {
          return HttpUnauthorizedHandler({ message: (error as Error).message });
        }
      }
    }
    return handler(req);
  };
};
