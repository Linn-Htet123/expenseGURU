import { connect } from "@/backend/db/db.connect";
import { NextRequest } from "next/server";
import { getDataFromToken } from "@/backend/helpers/password";
import { UserService } from "@/backend/services/user";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "@/backend/helpers/httpExceptionHandler";
import { authMeUserResponseMapper } from "@/backend/mappers/user.mapper";
import { UserObject, UserResponseObject } from "@/backend/types/user";

connect();

const { findOne } = UserService();

export async function GET(request: NextRequest) {
  try {
    // Extract user ID from the authentication token
    const _id = await getDataFromToken(request);

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
}
