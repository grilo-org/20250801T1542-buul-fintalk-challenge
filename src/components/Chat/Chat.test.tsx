import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import Chat from "./Chat";

const mockOnClose = vi.fn();
const mockUseChat = vi.fn();

vi.mock("../../hooks/useChat", () => ({
  useChat: () => mockUseChat(),
}));

describe("Chat", () => {
  beforeEach(() => {
    mockUseChat.mockReturnValue({
      messages: [],
      inputValue: "",
      setInputValue: vi.fn(),
      handleSendMessage: vi.fn(),
      handleClearChat: vi.fn(),
    });
  });
  it("should render the chat component with the correct initial layout and elements", () => {
    render(<Chat onClose={mockOnClose} />);

    // Check if the main chat container is rendered
    const chatRoot = screen.getByTestId("chat-root");
    expect(chatRoot).toBeInTheDocument();

    // Check if the chat header is rendered correctly
    const chatHeader = screen.getByText("Chat");
    expect(chatHeader).toBeInTheDocument();

    // Check if the clear chat and close chat buttons are present
    const clearChatButton = screen.getByTestId("clear-chat-button");
    const closeChatButton = screen.getByTestId("close-chat-button");
    expect(clearChatButton).toBeInTheDocument();
    expect(closeChatButton).toBeInTheDocument();

    // Check if the chat messages container is present
    const chatMessages = screen.getByTestId("chat-messages");
    expect(chatMessages).toBeInTheDocument();

    // Check if the input field and send button are present
    const inputField = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByText("Send");
    expect(inputField).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });
  it("should display messages with appropriate styling for user and non-user messages", () => {
    mockUseChat.mockReturnValue({
      messages: [
        { text: "User message", isUser: true },
        { text: "Non-user message", isUser: false },
      ],
      inputValue: "",
      setInputValue: vi.fn(),
      handleSendMessage: vi.fn(),
      handleClearChat: vi.fn(),
    });

    render(<Chat onClose={mockOnClose} />);

    const messages = screen.getAllByText(/message/);
    expect(messages).toHaveLength(2);

    const userMessage = messages[0];
    const nonUserMessage = messages[1];

    expect(userMessage).toHaveTextContent("User message");
    expect(userMessage).toHaveClass(
      "bg-pink-100",
      "dark:bg-pink-900",
      "ml-auto",
      "text-right"
    );

    expect(nonUserMessage).toHaveTextContent("Non-user message");
    expect(nonUserMessage).toHaveClass(
      "bg-gray-100",
      "dark:bg-gray-700",
      "text-left"
    );
  });
  it("should scroll to the bottom of the chat container when new messages are added", () => {
    const mockScrollContainer = {
      scrollTop: 0,
      scrollHeight: 100,
    };
    const mockGetElementById = vi.fn(
      () => mockScrollContainer as unknown as HTMLElement
    );

    vi.spyOn(document, "getElementById").mockImplementation(mockGetElementById);

    mockUseChat.mockReturnValue({
      messages: [{ text: "Initial message", isUser: true }],
      inputValue: "",
      setInputValue: vi.fn(),
      handleSendMessage: vi.fn(),
      handleClearChat: vi.fn(),
    });

    render(<Chat onClose={mockOnClose} />);

    // Simulate adding a new message
    mockUseChat.mockReturnValue({
      messages: [
        { text: "Initial message", isUser: true },
        { text: "New message", isUser: false },
      ],
      inputValue: "",
      setInputValue: vi.fn(),
      handleSendMessage: vi.fn(),
      handleClearChat: vi.fn(),
    });

    // Re-render the component to trigger the useEffect
    render(<Chat onClose={mockOnClose} />);

    expect(mockGetElementById).toHaveBeenCalledWith("chat-messages");
    expect(mockScrollContainer.scrollTop).toBe(
      mockScrollContainer.scrollHeight
    );
  });
  it("should close the chat window when the close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<Chat onClose={mockOnClose} />);

    const closeButton = screen.getByTestId("close-chat-button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it("should send a message when the Send button is clicked", () => {
    const mockHandleSendMessage = vi.fn();
    mockUseChat.mockReturnValue({
      messages: [],
      inputValue: "Test message",
      setInputValue: vi.fn(),
      handleSendMessage: mockHandleSendMessage,
      handleClearChat: vi.fn(),
    });

    render(<Chat onClose={mockOnClose} />);

    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    expect(mockHandleSendMessage).toHaveBeenCalledTimes(1);
  });
  it("should send a message when the Enter key is pressed in the input field", () => {
    const mockHandleSendMessage = vi.fn();
    mockUseChat.mockReturnValue({
      messages: [],
      inputValue: "Test message",
      setInputValue: vi.fn(),
      handleSendMessage: mockHandleSendMessage,
      handleClearChat: vi.fn(),
    });

    render(<Chat onClose={mockOnClose} />);

    const inputField = screen.getByPlaceholderText("Type a message...");
    fireEvent.keyPress(inputField, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(mockHandleSendMessage).toHaveBeenCalledTimes(1);
  });
  it("should update the input field value as the user types", () => {
    mockUseChat.mockReturnValue({
      messages: [],
      inputValue: "",
      setInputValue: vi.fn(),
      handleSendMessage: vi.fn(),
      handleClearChat: vi.fn(),
    });

    render(<Chat onClose={mockOnClose} />);

    const inputField = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(inputField, { target: { value: "Hello" } });

    expect(mockUseChat().setInputValue).toHaveBeenCalledWith("Hello");
  });
  it("should apply different styles for desktop and mobile viewports", () => {
    const { container } = render(<Chat onClose={() => {}} />);
    const chatRoot = container.querySelector("[data-testid='chat-root']");

    // Mobile viewport
    expect(chatRoot).toHaveClass(
      "fixed",
      "bottom-0",
      "left-0",
      "right-0",
      "h-full",
      "w-full",
      "rounded-t-lg"
    );

    // Desktop viewport
    expect(chatRoot).toHaveClass(
      "sm:bottom-24",
      "sm:right-6",
      "sm:left-auto",
      "sm:w-80",
      "sm:h-96",
      "sm:rounded-lg"
    );

    // Common styles
    expect(chatRoot).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "shadow-xl",
      "flex",
      "flex-col"
    );
  });
});
