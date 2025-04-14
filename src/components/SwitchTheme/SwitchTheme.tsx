import { FC, useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { SwitchThemeProps } from "./SwitchTheme.types";

const SwitchTheme: FC<SwitchThemeProps> = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("darkTheme") === "true";
  });

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("darkTheme", String(newTheme));
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <Switch.Root
      data-testid="switch-root"
      checked={isDarkTheme}
      onCheckedChange={toggleTheme}
      className="w-[42px] h-[25px] border-0 bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 data-[state=checked]:bg-gray-600 outline-none cursor-default"
    >
      <Switch.Thumb
        data-testid="switch-thumb"
        className="flex items-center justify-center w-[22px] h-[22px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-gray-900 "
      >
        {(isDarkTheme && (
          <MoonIcon data-testid="moon-icon" className="text-white" />
        )) || <SunIcon data-testid="sun-icon" className="text-primary-500" />}
      </Switch.Thumb>
    </Switch.Root>
  );
};

export default SwitchTheme;
