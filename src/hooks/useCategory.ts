/* eslint-disable react-hooks/exhaustive-deps */
import { Categories } from "@/types/category";
import { CategoryType } from "@/validations/category/create";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { HttpStatus } from "@/backend/enums/httpStatus";
export const useCategory = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createCategory = useCallback(async (category: CategoryType) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/category", category);
      const newCategory = response.data.data;
      if (response.data.status === HttpStatus.CREATED) {
        toast({
          variant: "success",
          title: response.data.message,
        });
      }
      setCategories((prevCategories) => {
        const updatedCategories = [newCategory, ...prevCategories];
        return updatedCategories;
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message || error.response.data.error,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const editCategory = useCallback(
    async (category: { name: string; _id: string }) => {
      try {
        console.log(category);
        setLoading(true);
        const response = await axios.put("/api/category/" + category._id, {
          name: category.name,
        });
        const updatedCategory = response.data.data;
        console.log(response);
        if (response.data.status === HttpStatus.CREATED) {
          toast({
            variant: "success",
            title: response.data.message,
          });
        }
        setCategories((prevCategories) => {
          return prevCategories.map((cat) =>
            cat._id === updatedCategory._id ? updatedCategory : cat
          );
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.response.data.message || error.response.data.error,
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const deleteCategory = useCallback(async (id: string) => {
    try {
      const response = await axios.delete("/api/category/" + id);
      if (response.data.status === HttpStatus.CREATED) {
        toast({
          variant: "success",
          title: response.data.message,
        });
      }
      setCategories((prevCategories) => {
        const filteredCategories = prevCategories.filter(
          (category) => category._id !== id
        );
        return filteredCategories;
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message || error.response.data.error,
      });
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        const data = response.data.data.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, createCategory, editCategory, deleteCategory };
};
