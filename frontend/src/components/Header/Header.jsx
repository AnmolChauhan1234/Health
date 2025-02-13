import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useMenuContext } from "../../context/MenuContext/MenuContextProvider";
import { useUserContext } from "../../context/UserContext/UserContextProvider";
// import { useDarkMode } from "../../context/ThemeContext/ThemeContextProvider";

// import useGetProfile from "../../hooks/getProfile";

function Header() {
  const { isOpen, toggleMenu } = useMenuContext();
  const { user , profileData } = useUserContext();

  const profilePhoto = profileData?.profilePicture || "/images/user-dp.jpg";

  // const profilePhoto = user?.profile_photo || "/images/vermil.jpg";

  return (
    <header 
      className="h-16 text-gray-900 dark:text-white sticky top-0 flex items-center z-50 bg-white dark:bg-gray-900 px-1 sm:px-2 shadow-md shadow-gray-300 dark:shadow-sm dark:shadow-black ubuntu-regular"
    >
      <nav 
        className="h-[90%] w-full flex items-center justify-between px-1 sm:px-2 ubuntu-regular-italic"
      >
        {/* Logo section starts here */}
        <div className="flex gap-x-3 items-center rounded-full cursor-pointer">
          <img
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full transition-cus"
            src="/Favicon.png"
            alt="Logo"
          />
        </div>
        {/* Logo section ends here */}

        {/* Name section starts here */}
        <span className="flex">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold italic transition-transform ease-in duration-150"
          >
            Health Easy
          </Link>
        </span>
        {/* Name section ends here */}

        {/* Hamburger starts here */}
        <div className="flex sm:hidden ">
          <button onClick={toggleMenu} className="focus:outline-none">
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
              ></path>
            </svg>
          </button>
        </div>
        {/* Hamburger ends here */}

        {/* User and mode switch section starts here */}
        <ul className={`hidden sm:flex gap-x-4 text-lg items-center`}>
          {/* Home section starts here */}
          <li className="hidden sm:block">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return `${
                  isActive
                    ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-light-italic"
                    : ""
                } rounded-[25px] py-1 px-3`;
              }}
            >
              Home
            </NavLink>
          </li>
          {/* Home section ends here */}

          {/* About section starts here */}
          <li className="hidden sm:block">
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return `${
                  isActive
                    ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-light-italic"
                    : ""
                } rounded-[25px] py-1 px-3`;
              }}
            >
              About
            </NavLink>
          </li>
          {/* About section ends here */}

          {/* User section starts here */}
          <li>
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                  return `${
                    isActive
                      ? " text-white dark:text-gray-800 ubuntu-light-italic"
                      : ""
                  } py-1 px-3 `;
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/auth/register"
                className={({ isActive }) => {
                  return `${
                    isActive
                      ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic"
                      : ""
                  } rounded-md py-2 px-3 text-base bg-sky-400 hover:bg-sky-300 cursor-pointer`;
                }}
              >
                Login/Register
              </NavLink>
            )}
          </li>
          {/* User section ends here */}

          <li className="flex">
            <ThemeToggle />
          </li>

        </ul>
        {/* User and mode switch section ends here */}

      </nav>

      {/* Mobile menu starts here */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-end z-50">

          {/* Background overlay */}
          <div
            className="bg-black opacity-50 w-1/2 h-full cursor-pointer"
            onClick={toggleMenu}
          ></div>

          {/* Menu container */}
          <div 
            className="w-1/2 h-full bg-white dark:bg-gray-900 shadow-lg shadow-gray-300 dark:shadow-sm dark:shadow-black p-6 ubuntu-medium-italic text-base z-50 overflow-y-auto"
          >
            <ul className="flex flex-col items-center gap-y-6">

              {/* Close button */}
              <li className="w-full flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="text-white text-lg font-bold bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full cursor-pointer transition-colors duration-200 flex items-center justify-center"
                >
                  X
                </button>
              </li>

              {/* Separator */}
              <hr className="w-full border-t border-gray-200 dark:border-gray-700" />

              {/* Home section */}
              <li className="w-full">
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return `${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    } rounded-[25px] py-2 px-4 block text-center transition-colors duration-200`;
                  }}
                >
                  Home
                </NavLink>
              </li>

              {/* Separator */}
              <hr className="w-full border-t border-gray-200 dark:border-gray-700" />

              {/* About section */}
              <li className="w-full">
                <NavLink
                  to="/about"
                  className={({ isActive }) => {
                    return `${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    } rounded-[25px] py-2 px-4 block text-center transition-colors duration-200`;
                  }}
                >
                  About
                </NavLink>
              </li>

              {/* Separator */}
              <hr className="w-full border-t border-gray-200 dark:border-gray-700" />

              {/* Profile section */}
              <li className="w-full">
                {user ? (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => {
                      return `${
                        isActive
                          ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      } rounded-[25px] py-2 px-4 block text-center transition-colors duration-200`;
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                      <span>Profile</span>
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/auth/register"
                    className={({ isActive }) => {
                      return `${
                        isActive
                          ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800 ubuntu-regular-italic"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      } rounded-[25px] py-2 px-4 block text-center transition-colors duration-200`;
                    }}
                  >
                    Login/Register
                  </NavLink>
                )}
              </li>

              {/* Separator */}
              <hr className="w-full border-t border-gray-200 dark:border-gray-700" />

              {/* Theme toggle */}
              <li className="w-full flex justify-center">
                <ThemeToggle />
              </li>
            </ul>
          </div>

        </div>
      )}
      {/* Mobile menu ends here */}

    </header>
  );
}

export default Header;
