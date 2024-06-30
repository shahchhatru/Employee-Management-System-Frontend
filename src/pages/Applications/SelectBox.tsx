import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectBoxProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const selectedLabel =
    options.find((option) => option.value === value)?.label || placeholder;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={selectedLabel} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
