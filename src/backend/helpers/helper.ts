import mongoose from "mongoose";
import {HttpBadRequestHandler} from "@/backend/helpers/httpExceptionHandler";

export const transformToObjectId = (id: string, errorMsg: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new Error(errorMsg);
  }
};

export const checkDateFormat = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const dateObject = new Date(date);

  return (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() + 1 === month &&
    dateObject.getDate() === day
  );
};

export const withErrorHandling = (fn: Function) => async (...args: any[]) => {
  try {
    return await fn(...args);
  } catch (error:any) {
    return HttpBadRequestHandler(error.message);
  }
};