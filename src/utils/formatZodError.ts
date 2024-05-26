import { ZodError, ZodIssue } from "zod";

export const formatZodError = (error: ZodError) => {
  const { issues } = error;
  let errorObj: any = {};
  issues.forEach((issue: ZodIssue) => {
    const { path, message } = issue;
    errorObj[path.join(".")] = message;
  });
  //   return JSON.stringify(errorObj);
  return { error: errorObj };
};
