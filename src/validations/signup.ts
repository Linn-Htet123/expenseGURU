import { z } from "zod";

export const signUpValidation = z
  .object({
    username: z.string({ message: "need username" }),
    email: z.string({ message: "need email" }),
    password: z.string({ message: "need password" }),
  })
  .required();
