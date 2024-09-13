import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white drop-shadow-lg filter drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))">
      <div className="h-full min-h-16 flex justify-between items-center mx-auto p-2 md:p-4 max-w-1xl">
        <div className="inline-flex items-center">
          {/* Sidebar Toggle Button */}
          <button
            className="text-2xl sm:text-3xl md:text-4xl p-2 transition duration-200 ease-in-out bg-white rounded-full  hover:shadow-xl hover:shadow-slate-300 focus:shadow-lg focus:outline-none"
            type="button"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faLandmark} />
          </button>

          <Link to='/'>
            <h1 className='font-head text-xl sm:text-2xl md:text-4xl lg:text-5xl flex flex-wrap font-semibold ml-2'>
              Science Museum
            </h1>
          </Link>
        </div>

        <ul className='flex justify-center sm:gap-8 items-center mr-8 text-lg sm:text-xl'>
          <Link to='/login'><li>Login</li></Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
