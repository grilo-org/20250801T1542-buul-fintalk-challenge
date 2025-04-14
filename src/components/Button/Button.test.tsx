import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should render a button with default primary variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-pink-500");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-pink-600");
    expect(button).toHaveClass("focus:ring-pink-500");
  });
  it("should render a button with secondary variant", () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-gray-200");
    expect(button).toHaveClass("text-gray-800");
    expect(button).toHaveClass("hover:bg-gray-300");
    expect(button).toHaveClass("focus:ring-gray-500");
  });
  it("should render a button with icon variant", () => {
    render(
      <Button variant="icon">
        <svg data-testid="icon" />
      </Button>
    );
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button).toHaveClass("p-1");
    expect(button).toHaveClass("text-gray-500");
    expect(button).toHaveClass("hover:text-gray-700");
    expect(button).toHaveClass("dark:text-gray-400");
    expect(button).toHaveClass("dark:hover:text-gray-200");
    expect(button).toHaveClass("focus:ring-gray-500");
  });
});
