import { ButtonHTMLAttributes } from "react";

export type Variants = "primary" | "outline" | "text";

export type Sizes = "sm" | "md";

export type ButtonStyledProps = {
  variant?: Variants;
  fullWidth?: boolean;
  size?: Sizes;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyledProps;
