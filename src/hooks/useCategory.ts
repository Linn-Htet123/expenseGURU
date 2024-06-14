import axios from "axios";
import { useEffect, useState } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState<any>();

  const getCategories = async () => {
    const response = await axios.get("/api/category");
    console.log(response.data.data.data);
    setCategories(response.data.data.data);
  };

  useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  return { categories };
};
