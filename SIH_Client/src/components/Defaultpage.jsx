import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GiAstronautHelmet } from "react-icons/gi";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MessageInput from "./MessageInput";
import ServerChatBox from "./ServerChatBox";
import UserChatBox from "./UserChatBox";

export default function Defaultpage({
  isChatBoxOpen,
  toggleChatBox,
  closeChatBox,
}) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! What can I do for you today?",
    },
  ]);

  const messagesEndRef = useRef(null); // Reference to scroll the chat box
  const navigate = useNavigate(); // Initialize the navigate function

  // Predefined responses based on the conversation flow
  const predefinedMessages = [
    { userQuery: "hi", botResponse: "Hello! How can I help you today?" },
    {
      userQuery: "tell me about the museum",
      botResponse: "The museum has exhibits on art, science, and history.",
    },
    {
      userQuery: "book tickets",
      botResponse:
        "For which date and time would you like to book the tickets?",
    },
    {
      userQuery: "for tomorrow at 3 pm",
      botResponse:
        "The museum is open at that time. How many tickets do you need?",
    },
    {
      userQuery: "4",
      botResponse: "Great! Do you want to book tickets for the shows as well?",
    },
    {
      userQuery: "yes",
      botResponse: "Great! Forwarding you to the payment gateway...",
    },
    {
      userQuery: "no",
      botResponse: "Okay! Forwarding you to the payment gateway...",
    },
    {
      userQuery: "inquire about timings",
      botResponse: "The museum is open from 9 AM to 5 PM every day.",
    },
  ];

  const handleUserQuery = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message },
    ]);

    // Find a predefined response
    const response = predefinedMessages.find(
      (msg) => msg.userQuery.toLowerCase() === message.toLowerCase()
    );

    setTimeout(() => {
      if (response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", text: response.botResponse },
        ]);

        // Check if the bot response is related to the payment gateway
        if (
          response.botResponse
            .toLowerCase()
            .includes("forwarding you to the payment gateway")
        ) {
          // Add delay before navigating to the payment gateway
          setTimeout(() => {
            navigate("/payment"); // Redirect to /payment route
          }, 3000); // 3 seconds delay
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "ai",
            text: "Sorry, I didn't understand that. Can you try again?",
          },
        ]);
      }
    }, 2000);
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  return (
    <div className="relative flex w-[35%] h-screen font-sm sm:font-md">
      {/* Chat Box */}
      <div
        className={`fixed right-0 top-0 h-full border-2 border-gray-500 p-4 sm:p-6 transition-transform duration-300 ${
          isChatBoxOpen ? "translate-x-0" : "translate-x-full"
        } ${isMobileView ? "w-full" : "w-[35%]"}`}
        style={{ marginTop: "4rem" }}
      >
        {/* Chat Bot Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg ml-5 font-semibold mt-3">Chat Bot</h2>
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
        <div className="flex-1 sm:mb-5 overflow-auto h-[52vh] sm:h-[65vh] w-11/12 border border-gray-300 rounded-lg p-4 mx-auto">
          <div className="messages">
            {messages.map((msg, index) =>
              msg.type === "user" ? (
                <UserChatBox key={index} message={msg.text} />
              ) : (
                <ServerChatBox key={index} message={msg.text} />
              )
            )}
            {/* Scroll to this element to view the latest message */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Section */}
        <MessageInput onSendMessage={handleUserQuery} />
      </div>

      {/* Chat Box Toggle Icon (Visible on small screens) */}
      {!isChatBoxOpen && isMobileView && (
        <button
          className="fixed bottom-4 right-4 border-2 border-gray-400 bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none sm:hidden md:block"
          onClick={toggleChatBox}
        >
          <GiAstronautHelmet size={"1.8rem"} />
        </button>
      )}
    </div>
  );
}
