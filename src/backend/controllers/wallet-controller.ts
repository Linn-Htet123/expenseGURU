import { NextRequest } from "next/server";
import { WalletService } from "../services/wallet";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "../helpers/httpExceptionHandler";

export const WalletController = () => {
  const { findByUserId } = WalletService();
  const getBalance = async (request: NextRequest) => {
    const userId = request.headers.get("userId")!;
    try {
      const response = await findByUserId(userId);
      return HttpCreatedHandler({
        success: true,
        data: response,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };
  return { getBalance };
};
