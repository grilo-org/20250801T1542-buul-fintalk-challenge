import { FC } from "react";

import { ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variantClasses = {
    primary:
      "px-4 py-2 bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500",
    secondary:
      "px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    icon: "p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:ring-gray-500",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
