import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("Should render the footer component without errors", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("footer-root");
    expect(footerElement).toBeInTheDocument();
    expect(
      screen.getByText("© 2025 paulodev. All rights reserved.")
    ).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });
  it("Should apply the correct CSS classes for responsive layout", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("footer-root");
    const containerDiv = footerElement.firstElementChild;
    const paragraph = containerDiv?.firstElementChild;
    const navElement = containerDiv?.lastElementChild;

    expect(footerElement).toHaveClass("px-4 py-6 sm:h-20");
    expect(containerDiv).toHaveClass(
      "h-full flex flex-col sm:flex-row justify-between items-center"
    );
    expect(paragraph).toHaveClass(
      "text-gray-600 dark:text-gray-300 text-center sm:text-left mb-4 sm:mb-0"
    );
    expect(navElement?.firstElementChild).toHaveClass(
      "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center"
    );
  });
  it("Should render the footer with dark mode styles when in dark mode", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("footer-root");
    const linkElements = screen.getAllByRole("link");

    expect(footerElement).toHaveClass("dark:bg-gray-800");
    expect(footerElement).toHaveClass(
      "dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.1)]"
    );
    expect(
      screen.getByText("© 2025 paulodev. All rights reserved.")
    ).toHaveClass("dark:text-gray-300");

    linkElements.forEach((link) => {
      expect(link).toHaveClass("dark:text-gray-300");
      expect(link).toHaveClass("dark:hover:text-pink-400");
    });
  });
});
