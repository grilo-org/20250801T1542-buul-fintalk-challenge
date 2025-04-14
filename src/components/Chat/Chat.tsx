import { FC, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { ChatProps } from "./Chat.types";

const Chat: FC<ChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div
      data-testid="chat-root"
      className="fixed bottom-0 left-0 right-0 sm:bottom-24 sm:right-6 sm:left-auto w-full sm:w-80 h-96 bg-white dark:bg-gray-800 rounded-t-lg sm:rounded-lg shadow-xl flex flex-col"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Chat
        </h2>
        <button
          onClick={onClose}
          data-testid="close-chat-button"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Cross2Icon />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            {message}
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
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
