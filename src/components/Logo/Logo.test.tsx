import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Logo from "./Logo";

describe("Logo", () => {
  it("should render the logo image with the correct source", () => {
    render(<Logo />);
    const logoImage = screen.getByTestId("logo");
    expect(logoImage).toHaveAttribute(
      "src",
      expect.stringContaining("logo.svg")
    );
  });
  it("should render the logo image with the correct alt text", () => {
    render(<Logo />);
    const logoImage = screen.getByTestId("logo");
    expect(logoImage).toHaveAttribute("alt", "logo fintalk");
  });
  it("should apply the correct CSS classes for flex layout and spacing", () => {
    render(<Logo />);
    const container = screen.getByTestId("logo").parentElement;
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("items-center");
    expect(container).toHaveClass("gap-4");
  });
  it("should apply the correct CSS classes to the logo image", () => {
    render(<Logo />);
    const logoImage = screen.getByTestId("logo");
    expect(logoImage).toHaveClass("w-[100px]");
    expect(logoImage).toHaveClass("sm:w-[130px]");
  });
  it("should render the '|' separator only on screens larger than small", () => {
    render(<Logo />);
    const separator = screen.getByText("|");
    expect(separator).toHaveClass("hidden");
    expect(separator).toHaveClass("sm:block");
  });
  it("should render the 'Challenge' text only on screens larger than small", () => {
    render(<Logo />);
    const challengeText = screen.getByText("Challenge");
    expect(challengeText).toHaveClass("hidden");
    expect(challengeText).toHaveClass("sm:block");
  });
});
