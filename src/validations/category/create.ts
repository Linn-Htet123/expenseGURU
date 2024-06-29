import { z } from "zod";

export const createValidation = z
  .object({
    name: z
      .string({ message: "Category field must not be empty" })
      .max(20, { message: "Category must be at most 20 characters long" })
      .regex(/^[A-Za-z\s]*$/, {
        message: "Category can only contain letters and spaces",
      }),
  })
  .required();

export type CategoryType = z.infer<typeof createValidation>;
