

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function LeftSideBar({ isOpen, closeSidebar }) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-[13vh] left-0 h-[calc(100vh-100px)] w-64 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl border-r border-gray-200 z-40`}
      >
        <div className="p-6 h-full relative text-black">
          {/* Close Button with Cross Icon */}
          <button
            className="absolute top-4 right-4 bg-transparent transition-all duration-300 text-black p-2 rounded-full cursor-pointer hover:shadow-sm hover:shadow-gray-500 hover:scale-110"
            onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          {/* Sidebar Content */}
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Museum Services</h2>
          
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-900 hover:rounded-lg">
              <button className="w-full text-left p-2 rounded">Book a Tour</button>
            </li>
            <li className="cursor-pointer hover:text-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-900 hover:rounded-lg">
              <button className="w-full text-left p-2 rounded">Buy Tickets</button>
            </li>
            <li className="cursor-pointer hover:text-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-900 hover:rounded-lg">
              <button className="w-full text-left p-2 rounded">Exhibit Information</button>
            </li>
            <li className="cursor-pointer hover:text-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-900 hover:rounded-lg">
              <button className="w-full text-left p-2 rounded">Contact Us</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for closing the sidebar by clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}
