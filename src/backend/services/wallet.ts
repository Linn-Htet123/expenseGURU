import Wallet from "../db/models/wallet";

export const WalletService = () => {
  const create = (wallet: any) => {
    const newWallet = new Wallet(wallet);
    return newWallet;
  };

  return { create };
};
