import { z } from "zod";

export const createValidation = z
  .object({
    name: z
      .string({ message: "need username" })
      .max(20, { message: "Name must be at most 20 characters long" })
      .regex(/^[A-Za-z\s]*$/, {
        message: "Name can only contain letters and spaces",
      }),
  })
  .required();

export type CategoryType = z.infer<typeof createValidation>;
