import { z } from "zod";
export const TransactionValidation = z
  .object({
    category: z.string({ message: "Category must not be empty." }),
    amount: z
      .string({ message: "Amount must not be empty." })
      .refine((val) => /^[1-9][0-9,]*$/.test(val.replace(/,/g, "")), {
        message: "Amount must not start with 0 and must be a valid number.",
      })
      .refine(
        (val) => Number(val.replace(/,/g, "")) >= 1,
        "Amount must be at leat 1.",
      ),
  })
  .required();

export type TransactionType = z.infer<typeof TransactionValidation>;
