import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Handle the Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="relative bg-white border-t border-gray-300 p-4 flex items-center">
      <input
        type="text"
        className="border-2 border-gray-400 rounded-lg w-full p-4 pr-10 resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyPress={handleKeyPress} // Listen for key press
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        onClick={handleSend}
        className="absolute right-10 text-gray-500 h-6 w-8 cursor-pointer"
      />
    </div>
  );
}

export default MessageInput;
