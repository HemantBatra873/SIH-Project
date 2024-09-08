import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

export default function LeftSideBar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-[15vh] left-0 h-[calc(100vh-140px)] w-64 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white bg-opacity-80 backdrop-blur-lg shadow-lg`}
      >
        <div className="p-4 h-full relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-pink-500 text-white p-0 rounded"
            onClick={closeSidebar}
          >
            Close
          </button>
          <h2 className="text-lg font-semibold">Sidebar Content</h2>
          <p>
            This sidebar leaves space for the header and bottom input. Click the close button or outside the sidebar to close it.
          </p>
        </div>
      </div>

      {/* Overlay for closing the sidebar by clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}
