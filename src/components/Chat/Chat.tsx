import { FC, useEffect } from "react";
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";

import { ChatProps } from "./Chat.types";
import { useChat } from "../../hooks/useChat";
import { Button } from "../Button";

const Chat: FC<ChatProps> = ({ onClose }) => {
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleClearChat,
  } = useChat();

  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      data-testid="chat-root"
      className="fixed bottom-0 left-0 right-0 h-full sm:bottom-24 sm:right-6 sm:left-auto w-full sm:w-80 sm:h-96 bg-white dark:bg-gray-800 rounded-t-lg sm:rounded-lg shadow-xl flex flex-col"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Chat
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleClearChat}
            data-testid="clear-chat-button"
            variant="icon"
            title="Clear chat"
          >
            <TrashIcon />
          </Button>
          <Button
            onClick={onClose}
            data-testid="close-chat-button"
            variant="icon"
            title="Close chat"
          >
            <Cross2Icon />
          </Button>
        </div>
      </div>
      <div
        data-testid="chat-messages"
        id="chat-messages"
        className="flex-grow p-4 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.isUser
                ? "bg-pink-100 dark:bg-pink-900 ml-auto"
                : "bg-gray-100 dark:bg-gray-700"
            } ${message.isUser ? "text-right" : "text-left"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-grow mr-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage} variant="primary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
