import { ZodError, ZodIssue, ZodObject } from "zod";

export const formatZodError = (error: ZodError) => {
  const { issues } = error;
  let errorObj: Record<string, string> = {};
  issues.forEach((issue: ZodIssue) => {
    const { path, message } = issue;
    errorObj[path.join(".")] = message;
  });
  return { error: errorObj };
};

export const validate = (body: object, validator: ZodObject<{}>) => {
  const parse = validator.safeParse(body);
  if (!parse.success) {
    return formatZodError(parse.error);
  }
  return false;
};
