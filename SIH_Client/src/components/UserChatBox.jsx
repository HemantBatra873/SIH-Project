import React from "react";
// in this component we will send a prop message that the user has send
function UserMessage({ message }) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-black text-white py-2 px-4 rounded-lg max-w-xs break-words">
        {message}
      </div>
    </div>
  );
}

export default UserMessage;
