import * as React from "react";
import { Field, FormikErrors, FormikTouched } from "formik";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  className?: string;
  name: string;
  as: React.ElementType;
}

const FormField: React.FC<InputProps> = ({
  as: InputComponent,
  name,
  className,
  type,
  errors,
  touched,
  ...props
}) => (
  <>
    <Field
      name={name}
      render={({ field }: { field: any }) => (
        <InputComponent
          {...field}
          type={type}
          className={cn(
            className,
            errors[name] && touched[name] && "border-red-500"
          )}
          {...props}
        />
      )}
    />
    {errors[name] && touched[name] && (
      <p className="text-red-500 p-0 m-0">{String(errors[name])}</p>
    )}
  </>
);

FormField.displayName = "FormField";

export { FormField };
