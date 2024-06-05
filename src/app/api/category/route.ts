import { CategoryController } from "@/backend/controllers/category-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { getAll, create } = CategoryController();

export const GET = applyMiddleware([checkUser], getAll);
export const POST = applyMiddleware([checkUser], create);
