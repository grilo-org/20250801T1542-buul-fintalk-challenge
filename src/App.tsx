import { useState } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

import { Footer } from "./components/Footer";
import Header from "./components/Header/Header";
import { Chat } from "./components/Chat";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  return (
    <div
      data-testid="app-root"
      className="flex flex-col justify-between h-screen w-screen"
    >
      <Header />
      <main className="flex-grow" data-testid="main">
        <div className="mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Fintalk Challenge
          </h1>
          <p>This is where your main content will go.</p>
        </div>
      </main>
      <Footer />
      <button
        data-testid="chat-button"
        onClick={toggleChat}
        className="cursor-pointer fixed bottom-5 sm:bottom-25 right-6 bg-pink-500 hover:bg-pink-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-gray-400 focus:ring-opacity-50"
        aria-label="Open chat"
      >
        <ChatBubbleIcon data-testid="chat-icon" className="h-6 w-6" />
      </button>
      {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default App;
