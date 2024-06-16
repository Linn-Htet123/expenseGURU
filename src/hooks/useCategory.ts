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
          title: "Category is created successfully",
        });
      }
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, newCategory];
        return updatedCategories;
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
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

  return { categories, createCategory, loading };
};
