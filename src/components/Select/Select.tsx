import { FC } from "react";
import * as SelectRadixUI from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { SelectProps } from "./Select.types";

const Select: FC<SelectProps> = ({
  onValueChange,
  value,
  options,
  placeholder,
}) => {
  return (
    <SelectRadixUI.Root
      data-testid="select-root"
      value={value}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectRadixUI.Trigger
        data-testid="select-trigger"
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] dark:bg-primary-500 data-[placeholder]:text-white outline-none"
      >
        <SelectRadixUI.Value
          data-testid="select-value"
          placeholder={placeholder}
        />
        <SelectRadixUI.Icon data-testid="select-icon">
          <ChevronDownIcon />
        </SelectRadixUI.Icon>
      </SelectRadixUI.Trigger>
      <SelectRadixUI.Portal data-testid="select-portal">
        <SelectRadixUI.Content
          data-testid="select-content"
          className="overflow-hidden text-white bg-pink-500 dark:bg-primary-500 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <SelectRadixUI.Viewport
            data-testid="select-viewport"
            className="p-[5px]"
          >
            {options.map((item) => (
              <SelectRadixUI.Item
                data-testid="select-item"
                key={item}
                value={item}
                className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              >
                <SelectRadixUI.ItemText
                  data-testid="select-text"
                  className="font-bold"
                >
                  {item}
                </SelectRadixUI.ItemText>
              </SelectRadixUI.Item>
            ))}
          </SelectRadixUI.Viewport>
        </SelectRadixUI.Content>
      </SelectRadixUI.Portal>
    </SelectRadixUI.Root>
  );
};

export default Select;
