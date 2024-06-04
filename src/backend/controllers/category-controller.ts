import { validate } from "@/utils/backend/zodValidation";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "../helpers/httpExceptionHandler";
import { createValidation } from "@/validations/category/create";
import { CategoryService } from "../services/category";
import { NextRequest } from "next/server";
import { chunkUrl } from "../helpers/chunk-url";

const {
  existingCategory,
  save: saveCategory,
  getAll: getAllCategory,
  findById: findCategoryById,
  update: updateCategory,
} = CategoryService();

export const CategoryController = () => {
  const getAll = async (request: NextRequest) => {
    try {
      const userId = request.headers.get("userId")!;
      const userCategory = await getAllCategory(userId);

      return HttpCreatedHandler({
        success: true,
        data: userCategory,
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

      await saveCategory({ ...body, userId });

      return HttpCreatedHandler({
        responseMessage: "Category created successfully",
        success: true,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const update = async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validatedResult = validate(body, createValidation);
      if (validatedResult) {
        return HttpBadRequestHandler(validatedResult);
      }

      const id = await chunkUrl(request);
      const userId = request.headers.get("userId")!;
      const category = await findCategoryById(id);
      await updateCategory(id, { ...body, userId });
      return HttpCreatedHandler({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  return { getAll, create, update };
};
