import mongoose from "mongoose";

export const transformToObjectId = (id: string, errorMsg: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new Error(errorMsg);
  }
};
