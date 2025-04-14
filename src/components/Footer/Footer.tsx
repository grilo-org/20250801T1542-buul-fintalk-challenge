import { FC } from "react";

import { FooterProps } from "./Footer.types";

const Footer: FC<FooterProps> = () => (
  <footer
    data-testid="footer-root"
    className="px-4 py-6 sm:h-20 dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.1)]"
  >
    <div className="h-full flex flex-col sm:flex-row justify-between items-center">
      <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left mb-4 sm:mb-0">
        &copy; 2025 paulodev. All rights reserved.
      </p>
      <nav>
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center">
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
