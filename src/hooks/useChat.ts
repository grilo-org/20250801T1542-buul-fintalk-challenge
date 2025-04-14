import { useState, useEffect, useMemo, useCallback } from "react";

import { Message } from "../components/Chat/Chat.types";
import { useUser } from "./selectors/userHooks";

const STORAGE_KEY_PREFIX = "chat_history_";

export const useChat = () => {
  const { data: selectedUser } = useUser();

  const storageKey = useMemo(() => {
    return `${STORAGE_KEY_PREFIX}${selectedUser?.id || "default"}`;
  }, [selectedUser]);

  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(storageKey);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem(storageKey);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [storageKey]);

  const chatbotResponses = useMemo(
    () => ({
      1: [
        "Hello! I'm the financial advisor bot. How can I help you with your investments today?",
        "That's an interesting investment strategy. Have you considered diversifying your portfolio?",
        "The stock market can be volatile. Would you like some tips on long-term investing?",
        "Saving for retirement is crucial. Shall we discuss some retirement planning options?",
        "Risk management is key in finance. How would you describe your risk tolerance?",
      ],
      2: [
        "Welcome to our tech support chat! What seems to be the issue with your device?",
        "Have you tried turning it off and on again? It's a classic solution that often works!",
        "I see. Can you provide more details about the error message you're seeing?",
        "Let's try updating your software. It might resolve the compatibility issues you're experiencing.",
        "Security is crucial in tech. Have you enabled two-factor authentication on your accounts?",
      ],
      3: [
        "Hello! I'm your personal health and wellness assistant. How can I support your wellness journey today?",
        "Regular exercise is key to good health. Would you like some tips for home workouts?",
        "Nutrition plays a big role in wellness. Shall we discuss balanced meal planning?",
        "Stress management is important. Have you tried any relaxation techniques recently?",
        "Sleep is crucial for overall health. How many hours of sleep do you typically get?",
      ],
      default: [
        "Hello! How can I assist you today?",
        "That's an interesting question. Let me think about it.",
        "I'm sorry, I don't have enough information to answer that. Could you provide more details?",
        "Thank you for your message. Is there anything else I can help you with?",
        "I understand your concern. Let me see what I can do to help.",
      ],
    }),
    []
  );

  const saveToLocalStorage = useCallback(
    (messages: Message[]) => {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    },
    [storageKey]
  );

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim()) {
      const userMessage: Message = { text: inputValue, isUser: true };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");
      saveToLocalStorage(updatedMessages);

      setTimeout(() => {
        const userId = selectedUser?.id || "default";
        const userResponses =
          chatbotResponses[userId as keyof typeof chatbotResponses] ||
          chatbotResponses.default;
        const botResponse: Message = {
          text: userResponses[Math.floor(Math.random() * userResponses.length)],
          isUser: false,
        };
        const newMessages = [...updatedMessages, botResponse];
        setMessages(newMessages);
        saveToLocalStorage(newMessages);
      }, 1000);
    }
  }, [
    inputValue,
    messages,
    selectedUser,
    chatbotResponses,
    saveToLocalStorage,
  ]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleClearChat,
  };
};
