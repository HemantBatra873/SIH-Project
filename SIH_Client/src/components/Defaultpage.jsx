import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';

export default function Defaultpage() {
  return (
    <div className="flex w-full h-screen">
      {/* Left Side Content Area (70% Width) */}
      <div className="w-[70%] h-screen overflow-y-scroll bg-gray-100 p-4">
        {/* Add your content here like images, blogs, news updates, etc. */}
        <h1 className="text-2xl font-bold mb-4">Content Section</h1>
        <p className="mb-4">This section can contain blog posts, news updates, events, or other content. It will scroll independently of the chatbox on the right side.</p>
        <img src="https://via.placeholder.com/600x300" alt="Blog Post" className="mb-4"/>
        <h2 className="text-xl font-semibold mb-2">Blog Title</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
        <div>
          {/* Add more scrollable content */}
        </div>
      </div>

      {/* Right Side Chat Box (30% Width, Fixed Position with Top Margin) */}
      <div className="w-[30%] fixed right-0 top-[15vh] h-[85vh] bg-white shadow-lg p-4 flex flex-col justify-between">
        {/* Output Section */}
        <div className="flex-1 overflow-auto bg-white border border-gray-300 rounded-lg mb-2 p-4">
          <p className="text-black-700 whitespace-pre-wrap">
            This is where the output will be displayed. You can have a large amount of text here, and it will scroll if it's too much for the visible area.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white border-t border-gray-300 p-4 flex items-center">
          <textarea
            className="form-control border-2 border-black rounded-lg w-full p-2 resize-none overflow-hidden"
            placeholder="Type your message..."
            rows="1"
            aria-label="Text input"
          />
          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
            type="button"
          >
            <FontAwesomeIcon icon={faTicketAlt} />
          </button>
        </div>
      </div>
    </div>
  );
}
