import { validate } from "@/utils/backend/zodValidation";
import {
  HttpBadRequestHandler,
  HttpCreatedHandler,
} from "../helpers/httpExceptionHandler";
import { createValidation } from "@/validations/category/create";
import { CategoryService } from "../services/category";
import { NextRequest } from "next/server";

const {
  existingCategory,
  save: saveCategory,
  getAll: getAllCategory,
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

      const userCategory = await existingCategory(userId, body.name);
      if (userCategory.length > 0) {
        return HttpBadRequestHandler("category already exists");
      }

      const savedCategory = await saveCategory({ ...body, userId });

      return HttpCreatedHandler({
        responseMessage: "Category created successfully",
        success: true,
      });
    } catch (error: any) {
      return HttpBadRequestHandler({ error: error.message });
    }
  };

  const update = async (request: NextRequest) => {
    // const { id } = request.query;
    // console.log(request.query);
    const url = await request.nextUrl;
    const pathname = url.pathname;
    const id = pathname.split("/").pop(); // Get the last segment of the pathname
    console.log(id);
    // console.log(url);

    return HttpCreatedHandler({ message: "update" });
    // try {
    //   const userId = request.headers.get("userId")!;
    //   const userCategory = await getAllCategory(userId);

    //   return HttpCreatedHandler({
    //     success: true,
    //     data: userCategory,
    //   });
    // } catch (error: any) {
    //   return HttpBadRequestHandler({ error: error.message });
    // }
  };

  return { getAll, create, update };
};
