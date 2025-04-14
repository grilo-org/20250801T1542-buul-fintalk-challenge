import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SwitchTheme from "./SwitchTheme";

describe("SwitchTheme", () => {
  it("should initialize with dark theme if localStorage has 'darkTheme' set to 'true'", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("true");

    render(<SwitchTheme />);

    const switchRoot = screen.getByTestId("switch-root");
    const switchThumb = screen.getByTestId("switch-thumb");

    expect(switchRoot).toHaveAttribute("data-state", "checked");
    expect(switchThumb).toContainElement(screen.getByTestId("moon-icon"));
  });
  it("should initialize with light theme if localStorage has 'darkTheme' set to 'false'", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("false");

    render(<SwitchTheme />);

    const switchRoot = screen.getByTestId("switch-root");
    const switchThumb = screen.getByTestId("switch-thumb");

    expect(switchRoot).toHaveAttribute("data-state", "unchecked");
    expect(switchThumb).toContainElement(screen.getByTestId("sun-icon"));
  });
  it("should toggle theme when switch is clicked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("false");
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<SwitchTheme />);

    const switchRoot = screen.getByTestId("switch-root");

    expect(switchRoot).toHaveAttribute("data-state", "unchecked");
    expect(screen.getByTestId("switch-thumb")).toContainElement(
      screen.getByTestId("sun-icon")
    );

    fireEvent.click(switchRoot);

    expect(switchRoot).toHaveAttribute("data-state", "checked");
    expect(screen.getByTestId("switch-thumb")).toContainElement(
      screen.getByTestId("moon-icon")
    );
    expect(setItemSpy).toHaveBeenCalledWith("darkTheme", "true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
  it("should update localStorage when theme is toggled", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("false");
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<SwitchTheme />);

    const switchRoot = screen.getByTestId("switch-root");

    fireEvent.click(switchRoot);

    expect(setItemSpy).toHaveBeenCalledWith("darkTheme", "true");

    fireEvent.click(switchRoot);

    expect(setItemSpy).toHaveBeenCalledWith("darkTheme", "false");
  });
  it("should add 'dark' class to document.documentElement when dark theme is active", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("true");

    render(<SwitchTheme />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    const switchRoot = screen.getByTestId("switch-root");
    fireEvent.click(switchRoot);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
  it("should remove 'dark' class from document.documentElement when light theme is active", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("false");

    render(<SwitchTheme />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    const switchRoot = screen.getByTestId("switch-root");
    fireEvent.click(switchRoot);

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(switchRoot);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
  it("should maintain theme state on component re-render", () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("true");

    const { rerender } = render(<SwitchTheme />);

    expect(screen.getByTestId("switch-root")).toHaveAttribute(
      "data-state",
      "checked"
    );
    expect(screen.getByTestId("switch-thumb")).toContainElement(
      screen.getByTestId("moon-icon")
    );

    rerender(<SwitchTheme />);

    expect(screen.getByTestId("switch-root")).toHaveAttribute(
      "data-state",
      "checked"
    );
    expect(screen.getByTestId("switch-thumb")).toContainElement(
      screen.getByTestId("moon-icon")
    );
  });
});
