import { UserController } from "@/backend/controllers/user-controller";
import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { checkUser } from "@/backend/middlewares/check-auth-middleware";

const { authMe } = UserController();

export const GET = applyMiddleware([checkUser], authMe);
