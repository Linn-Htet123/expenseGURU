import { UserController } from "@/backend/controllers/user-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";

const { logout } = UserController();

export const GET = applyMiddleware([], logout);
