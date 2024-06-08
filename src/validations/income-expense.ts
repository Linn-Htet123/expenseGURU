import { z } from "zod";

export const ExpenseValidation = z
  .object({
    category: z.string({ message: "category is required" }),
    amount: z
      .number({ message: "amount is required" })
      .min(1, "minimum amount is 1"),
  })
  .required();

export type ExpenseType = z.infer<typeof ExpenseValidation>;

export const IncomeValidation = z
  .object({
    amount: z
      .number({ message: "amount is required" })
      .min(1, "minimum amount is 1"),
  })
  .required();

export type IncomeType = z.infer<typeof IncomeValidation>;
