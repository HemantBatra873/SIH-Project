import React from "react";

function ServerChatBox({ message }) {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-black text-white py-2 px-4 rounded-lg max-w-xs break-words">
        {message}
      </div>
    </div>
  );
}

export default ServerChatBox;
