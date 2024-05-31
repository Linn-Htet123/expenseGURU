import { HttpCreatedHandler } from "@/backend/helpers/httpExceptionHandler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return HttpCreatedHandler({
    data: "Welcome from Expense GURU",
  });
}
