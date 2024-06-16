import axiosInstance from "@/lib/axios";
import { CategoryType } from "@/validations/category/create";

export const createCategory = async (category: CategoryType) => {
  try {
    const response = await axiosInstance.post("/category", category);
    return response.data.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editCategory = async (id: string, category: { name: string }) => {
  try {
    const response = await axiosInstance.put(`/category/${id}`, category);
    return response.data.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};
