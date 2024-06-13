import { z } from "zod";

export const getValidation = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "can't add negative value or character")
    .nullable()
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "can't add negative value or character")
    .nullable()
    .optional(),
  type: z
    .enum(["income", "expense"], {
      message: "type must be income or expense",
    })
    .optional(),
});
