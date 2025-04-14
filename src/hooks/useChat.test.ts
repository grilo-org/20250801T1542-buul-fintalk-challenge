import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { useChat } from "./useChat";

describe("useChat", () => {
  it("should initialize messages from localStorage if available", () => {
    const mockStorageKey = "chat_history_1";
    const mockMessages = [
      { text: "Hello", isUser: true },
      { text: "Hi there!", isUser: false },
    ];
    localStorage.setItem(mockStorageKey, JSON.stringify(mockMessages));

    vi.mock("./selectors/userHooks", () => ({
      useUser: () => ({ data: { id: 1 } }),
    }));

    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual(mockMessages);
    localStorage.removeItem(mockStorageKey);
  });
  it("should use default messages when localStorage is empty", () => {
    vi.mock("./selectors/userHooks", () => ({
      useUser: () => ({ data: { id: 1 } }),
    }));

    localStorage.clear();

    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(localStorage.getItem("chat_history_1")).toBeNull();
  });
  it("should clear chat history when handleClearChat is called", () => {
    const mockStorageKey = "chat_history_1";
    const mockMessages = [
      { text: "Hello", isUser: true },
      { text: "Hi there!", isUser: false },
    ];
    localStorage.setItem(mockStorageKey, JSON.stringify(mockMessages));

    vi.mock("./selectors/userHooks", () => ({
      useUser: () => ({ data: { id: 1 } }),
    }));

    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual(mockMessages);

    act(() => {
      result.current.handleClearChat();
    });

    expect(result.current.messages).toEqual([]);
    expect(localStorage.getItem(mockStorageKey)).toBeNull();
  });
  it("should handle empty input value when trying to send a message", () => {
    vi.mock("./selectors/userHooks", () => ({
      useUser: () => ({ data: { id: 1 } }),
    }));

    const { result } = renderHook(() => useChat());

    const initialMessagesLength = result.current.messages.length;

    act(() => {
      result.current.setInputValue("   ");
      result.current.handleSendMessage();
    });

    expect(result.current.messages.length).toBe(initialMessagesLength);
    expect(result.current.inputValue).toBe("   ");
  });
  it("should update inputValue state when setInputValue is called", () => {
    vi.mock("./selectors/userHooks", () => ({
      useUser: () => ({ data: { id: 1 } }),
    }));

    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.setInputValue("Hello, chatbot!");
    });

    expect(result.current.inputValue).toBe("Hello, chatbot!");
  });
});
