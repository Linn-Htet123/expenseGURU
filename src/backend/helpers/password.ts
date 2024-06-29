import { NextRequest } from "next/server";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcryptjs.compare(password, hashedPassword);
};

export const generateToken = async (tokenData: object) => {
  return await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
    expiresIn: "1d",
  });
};

export const getDataFromToken = (request: NextRequest) => {
  try {
    // Retrieve the token from the cookies
    const token = request.cookies.get("token")?.value || "";

    // Verify and decode the token using the secret key
    const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);

    // Return the user ID from the decoded token
    return decodedToken.id;
  } catch (error: any) {
    throw new Error("Unauthorized");
  }
};
