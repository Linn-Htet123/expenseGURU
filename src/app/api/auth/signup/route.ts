import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { UserController } from "@/backend/controllers/user-controller";

const { signUp } = UserController();

export const POST = applyMiddleware([], signUp);
