import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "wallets",
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);

export default Transaction;
