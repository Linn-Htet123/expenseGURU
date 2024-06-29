import Wallet from "../db/models/wallet";
import { transformToObjectId } from "../helpers/helper";
import { TransactionType } from "../types/transaction";

export const WalletService = () => {
  const findByUserId = async (id: string) => {
    let objectId = transformToObjectId(id, "wallet not found");

    const wallet = await Wallet.findOne({ userId: objectId });
    if (!wallet) {
      throw new Error("wallet not found");
    }
    return wallet;
  };

  const calculateBalance = async (id: string, amount: number, type: string) => {
    let objectId = transformToObjectId(id, "wallet not found");
    amount = type === TransactionType.EXPENSE ? -amount : amount;
    await Wallet.findOneAndUpdate(
      { _id: objectId },
      { $inc: { totalBalance: amount } },
    );
  };

  const create = (wallet: any) => {
    return new Wallet(wallet);
  };

  return { findByUserId, create, calculateBalance };
};
