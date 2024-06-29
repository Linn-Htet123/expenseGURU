import { useToast } from "@/components/ui/use-toast";
import type { VariantProps } from "class-variance-authority";
import { toastVariants } from "@/components/ui/toast";

type ToastVariant = VariantProps<typeof toastVariants>["variant"];

export const useToastHook = () => {
  const { toast } = useToast();

  const showToast = (
    variant: ToastVariant,
    title: string,
    description?: string,
  ) => {
    return toast({
      variant,
      title,
      description,
    });
  };

  const successToast = (title: string, description?: string) => {
    return showToast("success", title, description);
  };

  const errorToast = (title: string, description?: string) => {
    return showToast("destructive", title, description);
  };

  return {
    successToast,
    errorToast,
  };
};
