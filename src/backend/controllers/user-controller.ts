import { connect } from "@/backend/db/db.connect";
import { UserService } from "@/backend/services/user";
import { validate } from "@/utils/backend/zodValidation";
import { signInValidation } from "@/validations/sign-in";
import { NextRequest } from "next/server";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "../helpers/httpExceptionHandler";
import {
  comparePassword,
  generateToken,
  getDataFromToken,
  hashPassword,
} from "../helpers/password";
import { signUpValidation } from "@/validations/signup";
import { authMeUserResponseMapper } from "../mappers/user.mapper";
import { UserObject, UserResponseObject } from "../types/user";

connect();

const { findOne, save } = UserService();

export const UserController = () => {
  const signIn = async (request: NextRequest) => {
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
        return HttpBadRequestHandler("email or password is wrong");
      }

      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      const token = await generateToken(tokenData);
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
  };

  const signUp = async (request: NextRequest) => {
    try {
      const body = await request.json();

      const validatedResult = validate(body, signUpValidation);
      if (validatedResult) {
        return HttpBadRequestHandler(validatedResult);
      }

      const { username, email, password } = body;
      const user = await findOne({ email });
      if (user) {
        return HttpBadRequestHandler("user already exists");
      }
      const hashedPassword = await hashPassword(password);
      const savedUser = await save({
        username,
        email,
        password: hashedPassword,
      });

      const userResponse = authMeUserResponseMapper().map<
        UserObject,
        UserResponseObject
      >(savedUser, "UserObject", "UserResponseObject");

      return HttpCreatedHandler({
        responseMessage: "User created successfully",
        success: true,
        data: userResponse,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const authMe = async (request: NextRequest) => {
    try {
      const _id = await request.headers.get("x-user-id")!;

      // Find the user in the database based on the user ID
      const user = await findOne({ _id });

      const userResponse = authMeUserResponseMapper().map<
        UserObject,
        UserResponseObject
      >(user, "UserObject", "UserResponseObject");

      return HttpCreatedHandler({
        message: "User found",
        data: userResponse,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const logout = async () => {
    try {
      const response = HttpCreatedHandler({
        message: "Logout successful",
        success: true,
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      return response;
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  return { signIn, signUp, logout, authMe };
};
