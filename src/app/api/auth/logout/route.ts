import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "@/backend/helpers/httpExceptionHandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = HttpCreatedHandler({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return HttpBadRequestHandler({ error: error.message });
  }
}
