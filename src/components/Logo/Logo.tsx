import { FC } from "react";

import { LogoProps } from "./Logo.types";
import LogoSvg from "../../assets/logo.svg";

const Logo: FC<LogoProps> = () => (
  <div className="flex items-center gap-4">
    <img
      src={LogoSvg}
      alt="logo fintalk"
      className="w-[100px] sm:w-[130px]"
      data-testid="logo"
    />
    <strong className="text-xl hidden sm:block">|</strong>
    <strong className="text-xl hidden sm:block">Challenge</strong>
  </div>
);

export default Logo;
