import { NextRequest } from "next/server";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "../helpers/httpExceptionHandler";
import { validate } from "@/utils/backend/zodValidation";
import { createValidation } from "@/validations/transaction/create";
import { TransactionService } from "../services/transaction";
import { getValidation } from "@/validations/transaction/get";
import { WalletService } from "../services/wallet";
import { chunkUrl } from "../helpers/chunk-url";
import { changeCategoryValidation } from "@/validations/transaction/change-category";
import { connect } from "@/backend/db/db.connect";

connect();

const {
  save,
  deleteTransactionById,
  getAll: getAllTransaction,
  changeCategory: changeTransactionsCategory,
} = TransactionService();
const { findByUserId: findWalletByUserId } = WalletService();

export const TransactionController = () => {
  const getAll = async (request: NextRequest) => {
    try {
      const params = request.nextUrl.searchParams;
      const page = params.get("page") ?? "1";
      const limit = params.get("limit") ?? "10";
      const type = params.get("type") ?? null;
      const date = params.get("date") ?? null;

      const validatedResult = validate(
        { page, limit, type, date },
        getValidation
      );
      console.log("validatedResult", validatedResult);
      if (validatedResult) {
        return HttpBadRequestHandler(validatedResult);
      }

      const userId = request.headers.get("userId")!;
      const wallet = await findWalletByUserId(userId);
      const userTransaction = await getAllTransaction(
        wallet._id,
        +page,
        +limit,
        type,
        date
      );

      return HttpCreatedHandler({
        success: true,
        data: userTransaction,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const create = async (request: NextRequest) => {
    try {
      const body = await request.json();
      const userId = request.headers.get("userId")!;
      const validatedResult = validate(body, createValidation);
      if (validatedResult) {
        return HttpBadRequestHandler(validatedResult);
      }

      await save(body, userId);

      return HttpCreatedHandler({
        responseMessage: "Transaction created successfully",
        success: true,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const deleteTransaction = async (request: NextRequest) => {
    try {
      const transactionId = await chunkUrl(request);
      await deleteTransactionById(transactionId);
      return HttpCreatedHandler({
        responseMessage: "Transaction deleted successfully",
        success: true,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const changeCategory = async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validatedResult = validate(body, changeCategoryValidation);
      if (validatedResult) {
        return HttpBadRequestHandler(validatedResult);
      }

      const userId = request.headers.get("userId")!;
      const wallet = await findWalletByUserId(userId);
      await changeTransactionsCategory({
        ...body,
        walletId: wallet._id,
      });
      return HttpCreatedHandler({
        success: true,
        message: "Category changed successfully",
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  return { getAll, create, deleteTransaction, changeCategory };
};