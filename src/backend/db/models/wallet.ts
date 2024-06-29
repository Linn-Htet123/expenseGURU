import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  totalBalance: {
    type: Number,
    default: 0,
  },
});

const Wallet =
  mongoose.models.wallets || mongoose.model("wallets", walletSchema);

export default Wallet;
