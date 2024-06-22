import React from "react";
import { useField, useFormikContext } from "formik";
import { cn } from "@/lib/utils";

interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  options?: T[];
  isMoneyInput?: boolean;
  as: React.ElementType;
  fetchMore?: () => void;
  hasMore?: boolean;
  dataLength?: number;
  optionValue?: string;
  optionName?: string;
}

const FormField = <T extends Record<string, any>>({
  as: InputComponent,
  name,
  className,
  options,
  type,
  isMoneyInput = false,
  fetchMore,
  hasMore,
  dataLength,
  optionValue,
  optionName,
  ...props
}: InputProps<T>) => {
  const [field, meta] = useField(name);
  const form = useFormikContext();

  return (
    <>
      <InputComponent
        {...field}
        {...props}
        isMoneyInput={isMoneyInput}
        options={options}
        type={type}
        fetchMore={fetchMore}
        hasMore={hasMore}
        dataLength={dataLength}
        optionValue={optionValue}
        optionName={optionName}
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
