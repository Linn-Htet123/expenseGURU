import React from "react";
import { useField, useFormikContext } from "formik";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  options?: string[];
  as: React.ElementType;
}

const FormField: React.FC<InputProps> = ({
  as: InputComponent,
  name,
  className,
  options,
  type,
  ...props
}) => {
  const [field, meta] = useField(name);
  const form = useFormikContext();

  return (
    <>
      <InputComponent
        {...field}
        {...props}
        options={options}
        type={type}
        className={cn(
          className,
          meta.error && meta.touched && "border-red-500"
        )}
        field={field}
        form={form}
      />
      {meta.error && meta.touched && (
        <p className="text-red-500 p-0 m-0 text-xs">{String(meta.error)}</p>
      )}
    </>
  );
};

FormField.displayName = "FormField";

export { FormField };
