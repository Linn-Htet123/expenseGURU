import { WalletController } from "@/backend/controllers/wallet-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { getBalance } = WalletController();

export const GET = applyMiddleware([checkUser], getBalance);
