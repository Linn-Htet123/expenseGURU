import { checkDateFormat } from "@/backend/helpers/helper";
import { z } from "zod";

export const getValidation = z
  .object({
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
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in format "yyyy-mm-dd"')
      .nullable()
      .optional(),
    type: z
      .enum(["income", "expense"], {
        message: "type must be income or expense",
      })
      .nullable()
      .optional(),
  })
  .refine(
    (values) => {
      if (!values.date) return true;
      else {
        return checkDateFormat(values.date);
      }
    },
    {
      message: "Date must be valid date",
      path: ["date"],
    },
  );
