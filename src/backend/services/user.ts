import User from "@/backend/db/models/user";
import { UserCreateObject } from "../types/user";
import { WalletService } from "./wallet";

const { create: createWallet } = WalletService();

export const UserService = () => {
  const findOne = async (param: Record<string, string>) => {
    const user = await User.findOne(param);
    return user;
  };

  const create = (user: UserCreateObject) => {
    const newUser = new User(user);
    return newUser;
  };

  const save = async (user: UserCreateObject) => {
    const newUser = create(user);
    const savedUser = await newUser.save();
    if (savedUser) {
      const newWallet = createWallet({
        userId: savedUser._id,
        totalBalance: 0,
      });
      await newWallet.save();
    }
    return savedUser;
  };

  return { findOne, save };
};
