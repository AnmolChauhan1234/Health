import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-12 shadow-2xl shadow-gray-900 dark:shadow-gray-400 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo and Tagline */}
        <div>
          <h3 className="text-2xl font-bold ubuntu-regular italic">
            Health Easy
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Simplifying healthcare access for everyone, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold ubuntu-regular italic">
            Quick Links
          </h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            {/* <li>
              <Link
                to="/services"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
              >
                Services
              </Link>
            </li> */}
            <li>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold ubuntu-regular italic">
            Follow Us
          </h4>
          <div className="mt-2 flex space-x-4">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link
              to="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              to="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              to="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
            >
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
        &copy; {new Date().getFullYear()} Health Easy. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;