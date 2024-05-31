import { z } from "zod";

export const signUpValidation = z
  .object({
    username: z.string({ message: "need username" }),
    email: z
      .string({ message: "need email" })
      .email({ message: "format is wrong" }),
    password: z
      .string({ message: "need password" })
      .min(6, "password required at least 6 character"),
  })
  .required();
