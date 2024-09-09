import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faComments, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Defaultpage() {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);

  // Handle resizing to toggle mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };

  const closeChatBox = () => {
    setIsChatBoxOpen(false);
  };

  return (
    <div className="relative flex w-full h-screen">
      {/* Chat Box */}
      <div
        className={`fixed right-0 top-[1vh] h-[90vh] bg-white shadow-lg border-1 border-gray-300 p-4 sm:p-6 transition-transform duration-300 ${
          isChatBoxOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:w-[30%] w-full sm:translate-x-0`}
        style={{ marginTop: '10vh' }}
      >
        {/* Chat Bot Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg ml-5 font-semibold">Chat Bot</h2>
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
        <div className="flex-1 overflow-auto h-[65vh] w-11/12 bg-gray-100 border border-gray-300 rounded-lg mb-2 p-4 mx-auto">
          <p className="text-black-700 whitespace-pre-wrap bg-gray-100">
            This is where the output will be displayed. You can have a large amount of text here, and it will scroll if it's too much for the visible area.
          </p>
        </div>

        {/* Input Section */}
        <div className="relative bg-white border-t border-gray-300 p-4 flex items-center">
          <textarea
            className="form-control border-2 border-gray-400 rounded-lg w-full p-2 pr-10 resize-none overflow-hidden"
            placeholder="Type your message..."
            rows="1"
            aria-label="Text input"
            style={{ maxHeight: '150px' }}
            onInput={(e) => {
              e.target.style.height = 'auto'; // Reset height
              e.target.style.height = `${e.target.scrollHeight}px`; // Set new height without growing upwards
            }}
          />
          <FontAwesomeIcon
            icon={faTicketAlt}
            className="absolute top-4 right-6 text-gray-500"
          />
        </div>
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
