import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt,
  faComments,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import MessageInput from "./MessageInput";
import ServerChatBox from "./ServerChatBox";
import UserChatBox from "./UserChatBox";

export default function Defaultpage() {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);
  const [messages, setMessages] = useState([]);

  const sendMessageToServer = async (message) => {
    // Add user message to the chat
    setMessages([...messages, { type: "user", text: message }]);

    try {
      const response = await fetch("http://localhost:3000/user/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      // Add server message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", text: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle resizing to toggle mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };

  const closeChatBox = () => {
    setIsChatBoxOpen(false);
  };

  return (
    <div className="relative flex w-[35%] h-screen">
      {/* Chat Box */}
      <div
        className={`fixed right-0  h-full border border-gray-300 p-4 sm:p-6 transition-transform duration-300 ${
          isChatBoxOpen ? "translate-x-0" : "translate-x-full"
        } sm:w-[35%] w-full sm:translate-x-0`}
        style={{ marginTop: "4rem" }}
      >
        {/* Chat Bot Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg ml-5 font-semibold mt-3">Chat Bot</h2>
          {/* Only show close button if chat box is opened via the icon on mobile view */}
          {isChatBoxOpen && isMobileView && (
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={closeChatBox}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          )}
        </div>

        {/* Output Section */}
        <div className="flex-1 sm:mb-5 overflow-auto h-[65vh] w-11/12 border border-gray-300 rounded-lg p-4 mx-auto">
          <div className="messages">
            {messages.map((msg, index) =>
              msg.type === "user" ? (
                <UserChatBox key={index} message={msg.text} />
              ) : (
                <ServerChatBox key={index} message={msg.text} />
              )
            )}
          </div>
        </div>

        {/* Input Section */}
        <MessageInput onSendMessage={sendMessageToServer} />
      </div>

      {/* Chat Box Toggle Icon (Visible on small screens) */}
      {!isChatBoxOpen && isMobileView && (
        <button
          className="fixed bottom-4 right-4 bg-gradient-to-b from-gray-100 to-white text-black p-4 rounded-full shadow-xl border-black hover:bg-gradient-to-b hover:from-gray-200 hover:to-gray-100 hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none sm:hidden md:block"
          onClick={toggleChatBox}
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      )}
    </div>
  );
}
