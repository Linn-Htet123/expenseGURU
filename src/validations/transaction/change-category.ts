import { z } from "zod";

export const changeCategoryValidation = z
  .object({
    category: z.string({ message: "need category" }),
    destination_category: z.string({ message: "need destination category" }),
  })
  .required();
