import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useMenuContext } from '../../context/MenuContext/MenuContextProvider';

function Header() {
  const { isOpen, toggleMenu } = useMenuContext();

  return (
    <header 
      className='h-16 w-full text-gray-900 dark:text-white sticky top-0 flex items-center z-10 bg-white dark:bg-gray-900 px-1 sm:px-2 shadow-md shadow-gray-300 dark:shadow-sm dark:shadow-black ubuntu-regular'
    >
      <nav className='h-[90%] w-full flex items-center justify-between px-1 sm:px-2 ubuntu-medium-italic'>

        {/* Logo section starts here */}
        <div 
          className='flex gap-x-3 items-center rounded-full cursor-pointer'
        >
          <img 
            className='h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-cus'
            src="/Favicon.png" alt="Logo" 
          />
        </div>
        {/* Logo section ends here */}

        {/* Name section starts here */}
        <span className='flex'>
          <Link 
            to="/"
            className="text-2xl md:text-3xl font-bold italic transition-transform ease-in duration-150"
          >
            Health Easy
          </Link>
        </span>
        {/* Name section ends here */}

        {/* Hamburger starts here */}
        <div className='flex sm:hidden '>
          <button 
            onClick={toggleMenu} 
            className="focus:outline-none"
          >
            <svg 
              className="w-8 h-8 cursor-pointer" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              >
              </path>
            </svg>
          </button>
        </div>
        {/* Hamburger ends here */}

        {/* User and mode switch section starts here */}
        <ul 
          className={`hidden sm:flex gap-x-4 text-lg items-center`}
        >
          {/* Home section starts here */}
          <li className='hidden sm:block'>
            <NavLink 
              to='/'
              className={({isActive}) => {
                return `${isActive ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic': ''} rounded-[25px] py-1 px-3`
              }}
            >
              Home
            </NavLink>
          </li>
          {/* Home section ends here */}

          {/* About section starts here */}
          <li className='hidden sm:block'>
            <NavLink 
              to='/about'
              className={({isActive}) => {
                return `${isActive ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic': ''} rounded-[25px] py-1 px-3`
              }}
            >
              About
            </NavLink>
          </li>
          {/* About section ends here */}

          {/* User section starts here */}
          <li>
            <NavLink 
              to='/profile'
              className={({isActive}) => {
                return `${isActive ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic': ''} rounded-[25px] py-1 px-3 `
              }}
            >
              User
            </NavLink>
          </li>
          {/* User section ends here */}

          <li className='flex'>
            <ThemeToggle />
          </li>
        </ul>
        {/* User and mode switch section ends here */}
      </nav>

      {/* Mobile menu starts here*/}
      {isOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          {/* Bg filters starts here */}
          <div className="bg-black opacity-50 w-1/2 h-full" onClick={toggleMenu}>
          </div>
          {/* Bg filters ends here */}

          {/* Menus starts here */}
          <div 
            className="w-1/2 h-full bg-white dark:bg-gray-900 shadow-md shadow-gray-300 dark:shadow-sm dark:shadow-black p-4 ubuntu-medium-italic text-base z-50"
          >
            <ul className="flex flex-col items-center gap-y-4">

              {/* Close section starts here */}
              <li>
                <button
                  onClick={toggleMenu}
                  className="text-white text-lg font-bold bg-red-500 py-1/2 px-15 rounded-2xl cursor-pointer hover:bg-red-400"
                >
                  X
                </button>
              </li>
              {/* Close section ends here */}

              {/* Home section starts here */}
              <li>
                <NavLink 
                  to='/'
                  className={({isActive}) => {
                    return `${isActive ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic': ''} rounded-[25px] py-1 px-3`
                  }}
                >
                  Home
                </NavLink>
              </li>
              {/* Home section ends here */}

              {/* About section starts here */}
              <li>
                <NavLink 
                  to='/about'
                  className={({isActive}) => {
                    return `${isActive ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic': ''} rounded-[25px] py-1 px-3`
                  }}
                >
                  About
                </NavLink>
              </li>

              {/* Profile section starts here */}
              <li>
                <NavLink 
                  to='/profile'
                  className={({isActive}) => {
                    return `${isActive ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic': ''} rounded-[25px] py-1 px-3 `
                  }}
                >
                  User
                </NavLink>
              </li>
              {/* Profile section ends here */}

              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>
          {/* Menus ends here */}
        </div>
      )}
      {/* Mobile section ends here */}
    </header>
  )
}

export default Header;
