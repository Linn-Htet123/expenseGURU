import Category from "../db/models/category";
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
    if (cats.length > 0) {
      throw new Error("category already exists");
    }
  };

  const update = async (id: string, body: Record<string, string>) => {
    try {
      await existingCategory(body.userId, body.name);
      await Category.findOneAndUpdate({ _id: id }, body);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const getAll = async (
    userId: string,
    page = 1,
    limit = 10,
    search: string | null = null
  ) => {
    // Ensure page and limit are numbers and have valid values
    page = Math.max(1, +page);
    limit = Math.max(1, +limit);

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    let filter;
    if (search) {
      filter = {
        userId: { $in: [userId, null] },
        name: { $regex: search, $options: "i" },
      };
    } else {
      filter = {
        userId: { $in: [userId, null] },
      };
    }

    // Find the categories with pagination
    const cats = await Category.find(filter, { __v: 0 })
      .skip(skip)
      .limit(limit);

    // Optionally: Get the total count of matching documents for pagination metadata
    const totalDocs = await Category.countDocuments(filter);

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

  const deleteCategory = async (id: string, body: Record<string, string>) => {
    try {
      const category = await findById(id);
      const userId = transformToObjectId(body.userId, "user not found");
      if (!category.userId && !userId.equals(category.userId)) {
        throw new Error("can't delete other user's and system category");
      }
      await Category.findOneAndDelete({ _id: id });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    create,
    findById,
    save,
    getAll,
    update,
    deleteCategory,
  };
};
