import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./components/Header/Header", () => ({
  default: () => <div data-testid="mock-header" />,
}));

vi.mock("./components/Footer", () => ({
  Footer: () => <div data-testid="mock-footer" />,
}));

vi.mock("./components/Chat", () => ({
  Chat: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="mock-chat">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("App", () => {
  it("should render the main content with correct heading and paragraph", () => {
    render(<App />);

    const mainElement = screen.getByTestId("main");
    expect(mainElement).toBeInTheDocument();

    const heading = screen.getByRole("heading", {
      name: "Welcome to Fintalk Challenge",
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-2xl font-bold mb-4");

    const paragraph = screen.getByText(
      "This is where your main content will go."
    );
    expect(paragraph).toBeInTheDocument();
  });
  it("should display the Header component", () => {
    render(<App />);
    const headerElement = screen.getByTestId("mock-header");
    expect(headerElement).toBeInTheDocument();
  });
  it("should display the Footer component", () => {
    render(<App />);
    const footerElement = screen.getByTestId("mock-footer");
    expect(footerElement).toBeInTheDocument();
  });
  it("should render the chat button with correct icon and accessibility label", () => {
    render(<App />);

    const chatButton = screen.getByTestId("chat-button");
    expect(chatButton).toBeInTheDocument();
    expect(chatButton).toHaveAttribute("aria-label", "Open chat");

    const chatIcon = screen.getByTestId("chat-icon");
    expect(chatIcon).toBeInTheDocument();
    expect(chatIcon).toHaveClass("h-6 w-6");
  });
  it("should open the Chat component when the chat button is clicked", () => {
    render(<App />);

    const chatButton = screen.getByTestId("chat-button");
    expect(screen.queryByTestId("mock-chat")).not.toBeInTheDocument();

    fireEvent.click(chatButton);
    expect(screen.getByTestId("mock-chat")).toBeInTheDocument();
  });
  it("should close the Chat component when the onClose function is called", () => {
    render(<App />);

    const chatButton = screen.getByTestId("chat-button");
    fireEvent.click(chatButton);
    expect(screen.getByTestId("mock-chat")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(screen.queryByTestId("mock-chat")).not.toBeInTheDocument();
  });
  it("should ensure the chat button remains fixed at the bottom-right corner of the screen", () => {
    render(<App />);

    const chatButton = screen.getByTestId("chat-button");
    expect(chatButton).toBeInTheDocument();
    expect(chatButton).toHaveClass("fixed bottom-5 sm:bottom-25 right-6");
  });
});
