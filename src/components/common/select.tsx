import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectBoxProps extends FieldProps {
  options: string[];
  placeholder?: string;
}

const SelectBox = ({
  options,
  field,
  form,
  placeholder = "Select ...",
}: SelectBoxProps) => {
  const [selectValue, setSelectValue] = useState(field.value || "");

  useEffect(() => {
    if (field.value) {
      setSelectValue(field.value);
    }
  }, [field.value]);

  const handleChange = (value: string) => {
    setSelectValue(value);
    form.setFieldValue(field.name, value);
  };

  const error = form.errors[field.name];
  const touched = form.touched[field.name];

  return (
    <Select name={field.name} value={selectValue} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-full ${error && touched ? "border-red-500" : ""}`}
      >
        <SelectValue placeholder={selectValue || placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
