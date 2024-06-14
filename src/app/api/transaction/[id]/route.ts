import { TransactionController } from "@/backend/controllers/transaction-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { deleteTransaction } = TransactionController();

export const DELETE = applyMiddleware([checkUser], deleteTransaction);
