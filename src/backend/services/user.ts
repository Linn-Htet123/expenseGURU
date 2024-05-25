import User from "@/backend/db/models/user";
import { UserObject } from "../types/user";

export const UserService = () => {
  const findOne = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  };

  const create = (user: UserObject) => {
    const newUser = new User(user);
    return newUser;
  };

  const save = async (user: UserObject) => {
    const newUser = create(user);
    const savedUser = await newUser.save();
    return savedUser;
  };

  return { findOne, save };
};
