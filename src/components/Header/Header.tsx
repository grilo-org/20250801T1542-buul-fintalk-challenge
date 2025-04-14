import { FC, useState } from "react";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { HeaderProps } from "./Header.types";
import { Avatar } from "../Avatar";
import { SwitchTheme } from "../SwitchTheme";
import { Select } from "../Select";
import { Logo } from "../Logo";

const Header: FC<HeaderProps> = () => {
  const [selectedUser, setSelectedUser] = useState("Paulo Firmino");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const users = ["Paulo Firmino", "John Doe", "Jane Smith"];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderSelectUser = () => (
    <Select
      options={users}
      placeholder="Select a user"
      value={selectedUser}
      onValueChange={setSelectedUser}
    />
  );

  const renderAvatar = () => <Avatar title={selectedUser} />;

  const renderSwitchTheme = () => <SwitchTheme />;

  return (
    <nav
      data-testid="nav"
      className="px-4 flex items-center justify-between w-full h-16 bg-pink-500 text-white dark:bg-gray-900 dark:text-white"
    >
      <Logo />
      <div
        data-testid="desktop-actions"
        className="hidden sm:flex items-center gap-4"
      >
        {renderSwitchTheme()}
        {renderAvatar()}
        {renderSelectUser()}
      </div>
      <div data-testid="mobile-actions" className="sm:hidden flex gap-6">
        {renderSwitchTheme()}
        <button onClick={toggleMobileMenu} className="text-white">
          {(isMobileMenuOpen && <Cross1Icon className="size-5" />) || (
            <HamburgerMenuIcon className="size-5" />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          data-testid="menu-mobile"
          className="absolute top-16 left-0 right-0 bg-pink-500 dark:bg-gray-900 p-4 sm:hidden"
        >
          <div className="flex flex-col  items-center gap-4">
            {renderAvatar()}
            {renderSelectUser()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
