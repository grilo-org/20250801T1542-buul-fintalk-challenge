import { HTMLAttributes } from "react";
import * as Switch from "@radix-ui/react-switch";

export interface SwitchThemeProps extends HTMLAttributes<Element> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

export type SwitchRootProps = Switch.SwitchProps;
export type SwitchThumbProps = Switch.SwitchThumbProps;
