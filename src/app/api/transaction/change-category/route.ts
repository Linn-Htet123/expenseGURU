import { TransactionController } from "@/backend/controllers/transaction-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { changeCategory } = TransactionController();

export const POST = applyMiddleware([checkUser], changeCategory);
