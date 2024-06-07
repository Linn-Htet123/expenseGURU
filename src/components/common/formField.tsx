import * as React from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  as: React.ElementType;
}

const FormField: React.FC<InputProps> = ({
  as: InputComponent,
  name,
  className,
  type,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <>
      <InputComponent
        {...field}
        type={type}
        className={cn(
          className,
          meta.error && meta.touched && "border-red-500"
        )}
        {...props}
      />
      {meta.error && meta.touched && (
        <p className="text-red-500 p-0 m-0 text-xs">{String(meta.error)}</p>
      )}
    </>
  );
};

FormField.displayName = "FormField";

export { FormField };
