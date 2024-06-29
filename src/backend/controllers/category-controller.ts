import { validate } from "@/utils/backend/zodValidation";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "../helpers/httpExceptionHandler";
import { createValidation } from "@/validations/category/create";
import { CategoryService } from "../services/category";
import { NextRequest } from "next/server";
import { chunkUrl } from "../helpers/chunk-url";
import { getValidation } from "@/validations/category/get";
import {withErrorHandling} from "@/backend/helpers/helper";

const {
  save: saveCategory,
  getAll: getAllCategory,
  findById: findCategoryById,
  update: updateCategory,
  deleteCategory: deleteCategoryById,
} = CategoryService();

const getAll = withErrorHandling(async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const page = params.get("page") ?? "1";
  const limit = params.get("limit") ?? "20";
  const search = params.get("search") ?? null;

  const validatedResult = validate({ page, limit, search }, getValidation);
  if (validatedResult) {
    return HttpBadRequestHandler(validatedResult);
  }

  const userId = request.headers.get("userId")!;
  const userCategory = await getAllCategory(userId, +page, +limit, search);

  return HttpCreatedHandler(userCategory);
});

const create = withErrorHandling(async (request: NextRequest) => {
  const body = await request.json();
  const userId = request.headers.get("userId")!;

  validate(body, createValidation);

  const savedCategory = await saveCategory({ ...body, userId });

  return HttpCreatedHandler({ data: savedCategory, message: "Category created successfully", success: true });
});

const update = withErrorHandling(async (request: NextRequest) => {
  const body = await request.json();

  validate(body, createValidation);

  const id = await chunkUrl(request);
  const userId = request.headers.get("userId")!;
  let category = await findCategoryById(id);
  await updateCategory(id, { ...body, userId });
  category.name = body.name;

  return HttpCreatedHandler({ data: category, message: "Category updated successfully", success: true });
});

const deleteCategory = withErrorHandling(async (request: NextRequest) => {
  const id = await chunkUrl(request);
  const userId = request.headers.get("userId")!;
  await deleteCategoryById(id, { userId });

  return HttpCreatedHandler({ message: "Category deleted successfully", success: true });
});

export const CategoryController = () => {
  return { getAll, create, update, deleteCategory };
};
