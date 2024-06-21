import { Categories } from "@/types/category";
import { CategoryType } from "@/validations/category/create";
import axiosInstance from "@/lib/axios";
import { useEffect, useState, useCallback } from "react";
import { HttpStatus } from "@/backend/enums/httpStatus";
import { useToastHook } from "./useToastHook";

export const useCategory = () => {
  const { successToast, errorToast } = useToastHook();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchCategories = useCallback(
    async (page = 1) => {
      try {
        const response = await axiosInstance.get(
          `/category?page=${page}&limit=10`
        );
        const data = response.data.data.data;
        if (page === 1) {
          setCategories(data);
        } else {
          setCategories((prevCategories) => [...prevCategories, ...data]);
        }
        setHasMore(data.length > 0);
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error
        );
      } finally {
        setIsFetching(false);
      }
    },
    [errorToast]
  );

  const fetchMore = async () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      return nextPage;
    });
  };

  const createCategory = useCallback(
    async (category: CategoryType) => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/category", category);
        const newCategory = response.data.data;

        if (response.data.status === HttpStatus.CREATED) {
          setCategories((prevCategories) => [newCategory, ...prevCategories]);
          return successToast(response.data.message);
        }
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error
        );
      } finally {
        setLoading(false);
      }
    },
    [errorToast, successToast]
  );

  const editCategory = useCallback(
    async (category: { name: string; _id: string }) => {
      try {
        setLoading(true);

        const { name, _id: id } = category;
        const response = await axiosInstance.put(`/category/${id}`, { name });
        const updatedCategory = response.data.data;

        if (response.data.status === HttpStatus.CREATED) {
          setCategories((prevCategories) => {
            return prevCategories.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            );
          });
          return successToast(response.data.message);
        }
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error
        );
      } finally {
        setLoading(false);
      }
    },
    [errorToast, successToast]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        const response = await axiosInstance.delete(`/category/${id}`);
        if (response.data.status === HttpStatus.CREATED) {
          setCategories((prevCategories) => {
            const filteredCategories = prevCategories.filter(
              (category) => category._id !== id
            );
            return filteredCategories;
          });
          return successToast(response.data.message);
        }
      } catch (error: any) {
        return errorToast(
          error.response.data.message || error.response.data.error
        );
      }
    },
    [errorToast, successToast]
  );

  useEffect(() => {
    fetchCategories(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    categories,
    loading,
    isFetching,
    hasMore,
    page,
    createCategory,
    editCategory,
    deleteCategory,
    fetchMore,
  };
};
