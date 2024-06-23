export interface Transaction {
  _id: string;
  amount: number;
  type: string;
  category: {
    name: string;
  };
  walletId: string;
  createdAt: string;
}
