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
import { CategoryService } from "../services/category";

connect();

const {
  save,
  deleteTransactionById,
  getAll: getAllTransaction,
  changeCategory: changeTransactionsCategory,
  findOne,
} = TransactionService();

const { findById: findCategoryById } = CategoryService();
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

  const getDetails = async (request: NextRequest) => {
    try {
      const transactionId = await chunkUrl(request);

      let transaction = await findOne({ _id: transactionId });
      let category = await findCategoryById(transaction.category);
      const response = {
        _id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        category: category.name,
      };

      return HttpCreatedHandler({
        success: true,
        data: response,
      });
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: error.message || "An error occurred",
      };
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

      const transaction = await save(body, userId);

      return HttpCreatedHandler({
        message: "Transaction created successfully",
        success: true,
        body: transaction,
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
        message: "Transaction deleted successfully",
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

  return { getAll, create, deleteTransaction, changeCategory, getDetails };
};
