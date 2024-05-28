import { connect } from "@/backend/db/db.connect";
import { NextRequest } from "next/server";
import { comparePassword, generateToken } from "@/backend/helpers/password";
import { UserService } from "@/backend/services/user";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "@/backend/helpers/httpExceptionHandler";
import { validate } from "@/utils/backend/zodValidation";
import { signInValidation } from "@/validations/sign-in";

connect();

const { findOne } = UserService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedResult = validate(body, signInValidation);
    if (validatedResult) {
      return HttpBadRequestHandler(validatedResult);
    }

    const { email, password } = body;
    const user = await findOne({ email });
    if (!user) {
      return HttpBadRequestHandler("user not found");
    }

    //check if password is correct
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return HttpBadRequestHandler("invalid password");
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await generateToken(tokenData);
    console.log(token);
    // Create a JSON response indicating successful login
    const response = HttpCreatedHandler({
      message: "Login successful",
      success: true,
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return HttpBadRequestHandler({ error: error.message });
  }
}
