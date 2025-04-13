import { FC } from "react";
import { ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({ children }) => (
  <button>
    <span>{children}</span>
  </button>
);

export default Button;
