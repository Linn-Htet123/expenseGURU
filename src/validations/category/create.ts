import { z } from "zod";

export const createValidation = z
  .object({
    name: z.string({ message: "need username" }),
  })
  .required();
