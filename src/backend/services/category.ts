import { User } from "lucide-react";
import Category from "../db/models/category";
import { userAgent } from "next/server";

export const CategoryService = () => {
  const create = (category: any) => {
    const newCategory = new Category(category);
    return newCategory;
  };

  const save = async (category: any) => {
    const newCategory = create(category);
    const savedCategory = await newCategory.save();
    return savedCategory;
  };

  const findById = async (id: string) => {
    return await Category.findById(id);
  };

  const existingCategory = async (userId: string, categoryName: string) => {
    const cats = await Category.find({
      userId: { $in: [userId, null] },
      name: categoryName,
    });
    return cats;
  };

  const getAll = async (userId: string) => {
    const cats = await Category.find({
      userId: { $in: [userId, null] },
    });
    return cats;
  };

  return { create, existingCategory, findById, save, getAll };
};
