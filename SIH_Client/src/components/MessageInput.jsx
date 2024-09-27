import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFileUpload } from "@fortawesome/free-solid-svg-icons"; // Importing file upload icon

function MessageInput({ onSendMessage, onFileUpload }) {
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

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="relative bg-white border-t border-gray-300 p-4 flex items-center">
      {/* File upload icon with more space from the left */}
      <div className="absolute left-8">
        {" "}
        {/* Increased left-4 to left-8 */}
        <input
          type="file"
          id="file-upload"
          className="hidden" // Hide default file input
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <FontAwesomeIcon
            icon={faFileUpload}
            className="text-gray-500 h-6 w-6"
          />
        </label>
      </div>

      {/* Message input */}
      <input
        type="text"
        className="border-2 border-gray-400 rounded-lg w-full p-4 pl-14 pr-10 resize-none" // Adjusted padding for the icons
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyPress={handleKeyPress} // Listen for key press
      />

      {/* Send button */}
      <FontAwesomeIcon
        icon={faPaperPlane}
        onClick={handleSend}
        className="absolute right-10 text-gray-500 h-6 w-8 cursor-pointer"
      />
    </div>
  );
}

export default MessageInput;
