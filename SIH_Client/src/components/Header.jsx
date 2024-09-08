import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center mx-auto p-1 md:p-4 max-w-7xl">
        <Link to='/'>
          <h1 className='font-head text-2xl sm:text-3xl lg:text-5xl flex flex-wrap font-semibold'>Science Museum</h1>
        </Link>
      <ul className='flex justify-center sm:gap-8 items-center mr-8 text-xl'>
        <Link to='/about'><li className='hidden sm:inline'>About</li></Link>
        <Link to='/login'><li>Login</li></Link>
      </ul>
      </div>
    </header>
  )
}

export default Header
