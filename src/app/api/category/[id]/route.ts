import { CategoryController } from "@/backend/controllers/category-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { update } = CategoryController();

export const PUT = applyMiddleware([checkUser], update);
