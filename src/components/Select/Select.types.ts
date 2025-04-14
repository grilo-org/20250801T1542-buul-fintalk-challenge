import { HTMLAttributes } from "react";
import * as RadixSelect from "@radix-ui/react-select";

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export interface SelectItemProps extends RadixSelect.SelectItemProps {
  children: React.ReactNode;
}
