export const enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface TransactionObject {
  _id: string;
  category: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  _v: number;
}

export interface TransactionCreateObject {
  category: string;
  amount: number;
  type: TransactionType;
}
