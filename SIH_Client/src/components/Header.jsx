import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleSidebar }) => {
  return (
    <header className=" max-h-16 drop-shadow-lg filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))">
      <div className="h-full min-h-16 flex justify-between items-center mx-auto p-1 md:p-4 max-w-1xl">
        <div className="inline-flex items-center">
        {/* Sidebar Toggle Button */}
        <button
          className=" text-3xl btn btn-primary m-4"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faLandmark} />
        </button>

        <Link to='/'>
          <h1 className='font-head text-1xl sm:text-3xl lg:text-5xl flex flex-wrap font-semibold'>
            Science Museum
          </h1>
        </Link>
        </div>
        
        <ul className='flex justify-center sm:gap-8 items-center mr-8 text-xl'>
          <Link to='/about'><li className='hidden sm:inline'>About</li></Link>
          <Link to='/login'><li>Login</li></Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
