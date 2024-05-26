import { connect } from "@/backend/db/db.connect";
import { NextRequest } from "next/server";
import { hashPassword } from "@/backend/helpers/password";
import { UserService } from "@/backend/services/user";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "@/backend/helpers/httpExceptionHandler";
import { signUpValidation } from "@/validations/signup";
import { validate } from "@/utils/backend/zodValidation";

connect();

const { findOne, save } = UserService();
export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const validatedResult = validate(json, signUpValidation);
    if (validatedResult) {
      return HttpBadRequestHandler(validatedResult);
    }

    const { username, email, password } = json;
    const user = await findOne(email);
    if (user) {
      return HttpBadRequestHandler("user already exists");
    }
    const hashedPassword = await hashPassword(password);
    const savedUser = await save({
      username,
      email,
      password: hashedPassword,
    });

    return HttpCreatedHandler({
      responseMessage: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return HttpBadRequestHandler({ error: error.message });
  }
}
