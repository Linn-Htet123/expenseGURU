import { z } from "zod";

export const createValidation = z
  .object({
    category: z.string({ message: "need category" }),
    amount: z
      .number({ message: "need amount" })
      .positive({ message: "amount must be positive" }),
    type: z.enum(["income", "expense"], { message: "need type" }),
  })
  .required();
