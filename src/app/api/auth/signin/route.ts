import { applyMiddleware } from "@/backend/middlewares/apply-middleware";
import { UserController } from "@/backend/controllers/user-controller";

const { signIn } = UserController();

export const POST = applyMiddleware([], signIn);
