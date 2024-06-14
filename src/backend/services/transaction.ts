import Transaction from "../db/models/transaction";
import { transformToObjectId } from "../helpers/helper";
import { TransactionCreateObject } from "../types/transaction";
import { CategoryService } from "./category";
import { WalletService } from "./wallet";

const {
  findByUserId: findWalletByUserId,
  calculateBalance: calculateWalletBalance,
} = WalletService();
const { findById: findCategoryById } = CategoryService();

export const TransactionService = () => {
  const getAll = async (
    walletId: string,
    page = 1,
    limit = 10,
    type: string | null = null,
    date: string | null = null
  ) => {
    // Ensure page and limit are numbers and have valid values
    page = Math.max(1, +page);
    limit = Math.max(1, +limit);

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const filter: Record<string, string> = {
      walletId,
    };
    if (type) {
      filter.type = type;
    }

    let dateFilter = {};
    if (date) {
      const dateObj = new Date(date);
      const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(
        dateObj.setHours(23, 59, 59, 999)
      ).toISOString();
      dateFilter = {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      };
    }

    // Find the categories with pagination
    const cats = await Transaction.find(
      { ...filter, ...dateFilter },
      { __v: 0 }
    )
      .populate({
        path: "category",
        select: "name -_id",
      })
      .skip(skip)
      .limit(limit);

    // Optionally: Get the total count of matching documents for pagination metadata
    const totalDocs = await Transaction.countDocuments({
      ...filter,
      ...dateFilter,
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalDocs / limit);

    // Return the results along with pagination info
    return {
      data: cats,
      page,
      limit,
      totalDocs,
      totalPages,
    };
  };

  const findOne = async (param: Record<string, string>) => {
    const transaction = await Transaction.findOne(param);
    return transaction;
  };

  const findById = async (id: string) => {
    let objectId = transformToObjectId(id, "transaction not found");

    const transaction = await Transaction.findById(objectId);
    if (!transaction) {
      throw new Error("transaction not found");
    }
    return transaction;
  };

  const create = async (
    transaction: TransactionCreateObject,
    userId: string
  ) => {
    const wallet = await findWalletByUserId(userId);
    const newTransaction = new Transaction({
      ...transaction,
      walletId: wallet._id,
    });
    return newTransaction;
  };

  const save = async (transaction: TransactionCreateObject, userId: string) => {
    const newTransaction = await create(transaction, userId);
    const savedTransaction = await newTransaction.save();
    await calculateWalletBalance(
      newTransaction.walletId,
      transaction.amount,
      transaction.type
    );
    return savedTransaction;
  };

  const deleteTransactionById = async (id: string) => {
    try {
      const transaction = await findById(id);
      await calculateWalletBalance(
        transaction.walletId,
        -transaction.amount,
        transaction.type
      );
      await transaction.deleteOne();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const changeCategory = async (body: Record<string, string>) => {
    try {
      await Transaction.updateMany(
        { walletId: body.walletId, category: body.category },
        { $set: { category: body.destination_category } }
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { getAll, findOne, save, deleteTransactionById, changeCategory };
};
