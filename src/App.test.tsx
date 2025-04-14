import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("Should render the App component without crashing", () => {
    render(<App />);
    const appRoot = screen.getByTestId("app-root");
    expect(appRoot).toBeInTheDocument();
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("chat-button")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to Fintalk Challenge")
    ).toBeInTheDocument();
  });
  it("Should display the header component", () => {
    render(<App />);
    const headerElement = screen.getByTestId("nav");
    expect(headerElement).toBeInTheDocument();
  });
  it("Should display the main content with correct text", () => {
    render(<App />);
    const mainContent = screen.getByTestId("main");
    expect(mainContent).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to Fintalk Challenge")
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is where your main content will go.")
    ).toBeInTheDocument();
  });
  it("Should display the footer component", () => {
    render(<App />);
    const footerElement = screen.getByTestId("footer-root");
    expect(footerElement).toBeInTheDocument();
  });
  it("Should render the chat button with correct icon", () => {
    render(<App />);
    const chatButton = screen.getByTestId("chat-button");
    expect(chatButton).toBeInTheDocument();
    expect(chatButton).toHaveAttribute("aria-label", "Open chat");
    const chatIcon = within(chatButton).getByTestId("chat-icon");
    expect(chatIcon).toHaveClass("h-6 w-6");
  });
  it("Should open the chat component when the chat button is clicked", () => {
    render(<App />);
    const chatButton = screen.getByTestId("chat-button");
    expect(screen.queryByTestId("chat-root")).not.toBeInTheDocument();
    fireEvent.click(chatButton);
    expect(screen.getByTestId("chat-root")).toBeInTheDocument();
  });
  it("Should close the chat component when the close function is called", () => {
    render(<App />);
    const chatButton = screen.getByTestId("chat-button");
    fireEvent.click(chatButton);
    expect(screen.getByTestId("chat-root")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-chat-button");
    fireEvent.click(closeButton);
    expect(screen.queryByTestId("chat-root")).not.toBeInTheDocument();
  });
});
