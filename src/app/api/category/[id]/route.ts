import { CategoryController } from "@/backend/controllers/category-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { update, deleteCategory } = CategoryController();

export const PUT = applyMiddleware([checkUser], update);
export const DELETE = applyMiddleware([checkUser], deleteCategory);
