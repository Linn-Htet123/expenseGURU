import { z } from "zod";

export const signInValidation = z
  .object({
    email: z.string({ message: "need email" }),
    password: z.string({ message: "need password" }),
  })
  .required();

export type SignInType = z.infer<typeof signInValidation>;
