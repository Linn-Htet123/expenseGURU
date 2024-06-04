import { User } from "lucide-react";
import Category from "../db/models/category";
import { userAgent } from "next/server";
import {
  HttpBadRequestHandler,
  HttpNotFoundHandler,
} from "../helpers/httpExceptionHandler";
import mongoose from "mongoose";
import { transformToObjectId } from "../helpers/helper";

export const CategoryService = () => {
  const create = (category: any) => {
    const newCategory = new Category(category);
    return newCategory;
  };

  const save = async (category: any) => {
    await existingCategory(category.userId, category.name);
    const newCategory = create(category);
    const savedCategory = await newCategory.save();
    return savedCategory;
  };

  const findById = async (id: string) => {
    let objectId = transformToObjectId(id, "category not found");

    const category = await Category.findById(objectId);
    if (!category) {
      throw new Error("category not found");
    }
    return category;
  };

  const existingCategory = async (userId: string, categoryName: string) => {
    const cats = await Category.find({
      userId: { $in: [userId, null] },
      name: categoryName,
    });
    console.log(cats);
    if (cats.length > 0) {
      throw new Error("category already exists");
    }
  };

  const update = async (id: string, body: Record<string, string>) => {
    await existingCategory(body.userId, body.name);
    await Category.findOneAndUpdate({ _id: id }, body);
  };

  const getAll = async (userId: string) => {
    const cats = await Category.find({
      userId: { $in: [userId, null] },
    });
    return cats;
  };

  return {
    create,
    findById,
    save,
    getAll,
    update,
  };
};
