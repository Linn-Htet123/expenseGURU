import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfiniteScroll from "react-infinite-scroll-component";

interface SelectBoxProps<T> extends FieldProps {
  options: T[];
  placeholder?: string;
  fetchMore?: () => void;
  hasMore?: boolean;
  dataLength?: number;
  optionValue?: string;
  optionName?: string;
}
const SelectBox = <T extends Record<string, any>>({
  options,
  field,
  form,
  placeholder = "Select ...",
  fetchMore = () => {},
  hasMore = false,
  dataLength = 0,
  optionValue = "_id",
  optionName = "name",
}: SelectBoxProps<T>) => {
  const [selectValue, setSelectValue] = useState(field.value || "");

  useEffect(() => {
    setSelectValue(field.value || undefined);
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
        <div
          className="w-full h-72 grow overflow-auto scrollbar-hide"
          id="scrollableDiv"
        >
          <InfiniteScroll
            dataLength={dataLength}
            next={fetchMore}
            hasMore={hasMore}
            loader={<div>Loading...</div>}
            scrollableTarget="scrollableDiv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {options.map((option, index) => (
              <SelectItem key={index} value={option[optionValue]}>
                {option[optionName]}
              </SelectItem>
            ))}
          </InfiniteScroll>
        </div>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
