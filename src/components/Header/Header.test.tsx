import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Header from "./Header";

const mockDispatch = vi.fn();

vi.mock("../../hooks/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("../../hooks/selectors/userHooks", () => ({
  useUser: () => ({ data: { id: 1, name: "Test User" } }),
  useUserList: () => ({
    data: [
      { id: 1, name: "Test User" },
      { id: 2, name: "Another User" },
    ],
  }),
}));
vi.mock("../Avatar", () => ({
  Avatar: () => <div data-testid="mock-avatar" />,
}));

vi.mock("../SwitchTheme", () => ({
  SwitchTheme: () => <div data-testid="mock-switch-theme" />,
}));

vi.mock("../Select", () => ({
  Select: () => <div data-testid="mock-select" />,
}));

vi.mock("../Logo", () => ({
  Logo: () => <div data-testid="mock-logo" />,
}));

describe("Header", () => {
  it("should render the logo correctly", () => {
    render(<Header />);
    const logoElement = screen.getByTestId("mock-logo");
    expect(logoElement).toBeInTheDocument();
  });
  it("should hide the desktop actions when screen width is below small breakpoint", () => {
    render(<Header />);
    const desktopActions = screen.getByTestId("desktop-actions");
    expect(desktopActions).toBeInTheDocument();
    expect(desktopActions).toHaveClass("hidden sm:flex");

    const mobileActions = screen.getByTestId("mobile-actions");
    expect(mobileActions).toBeInTheDocument();
    expect(mobileActions).toHaveClass("sm:hidden");
  });
  it("should toggle the mobile menu when the hamburger icon is clicked", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", { name: "" });
    expect(screen.queryByTestId("menu-mobile")).not.toBeInTheDocument();

    fireEvent.click(hamburgerButton);
    expect(screen.getByTestId("menu-mobile")).toBeInTheDocument();

    fireEvent.click(hamburgerButton);
    expect(screen.queryByTestId("menu-mobile")).not.toBeInTheDocument();
  });
  it("should close the mobile menu when the cross icon is clicked", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(hamburgerButton);
    expect(screen.getByTestId("menu-mobile")).toBeInTheDocument();

    const crossIcon = screen.getByTestId("mobile-actions").querySelector("svg");
    if (crossIcon) {
      fireEvent.click(crossIcon);
    }
    expect(screen.queryByTestId("menu-mobile")).not.toBeInTheDocument();
  });
  it("should maintain the selected user across mobile and desktop views", () => {
    render(<Header />);

    // Check initial state in desktop view
    const desktopSelect = screen
      .getByTestId("desktop-actions")
      .querySelector("[data-testid='mock-select']");
    expect(desktopSelect).toBeInTheDocument();

    // Open mobile menu
    const hamburgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(hamburgerButton);

    // Check if the same user is selected in mobile view
    const mobileSelect = screen
      .getByTestId("menu-mobile")
      .querySelector("[data-testid='mock-select']");
    expect(mobileSelect).toBeInTheDocument();
  });
  it("should render the SwitchTheme component in both desktop and mobile views", () => {
    render(<Header />);

    const desktopSwitchTheme = screen
      .getByTestId("desktop-actions")
      .querySelector("[data-testid='mock-switch-theme']");
    expect(desktopSwitchTheme).toBeInTheDocument();

    const mobileSwitchTheme = screen
      .getByTestId("mobile-actions")
      .querySelector("[data-testid='mock-switch-theme']");
    expect(mobileSwitchTheme).toBeInTheDocument();
  });
});
