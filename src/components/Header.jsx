import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";
import axios from "axios";
import { useAuth } from "../contexts/authContext.jsx";
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg"
              className="mr-3 h-12 rounded-md"
              alt="Logo"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center lg:order-2">
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-white border border-gray-300 dark:border-white px-4 lg:px-5 py-2 lg:py-2.5 font-medium rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition mr-4"
              title="Toggle Dark Mode"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
              >
                <HiOutlineLogin className="text-lg" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-800 hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-500 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
              >
                <HiOutlineLogin className="text-lg" />
                Log in
              </Link>
            )}
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive, isPending }) =>
                    `block py-2 pr-4 pl-3 duration-200  ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0 dark:text-white`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive, isPending }) =>
                    `block py-2 pr-4 pl-3 duration-200  ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0  dark:text-white`
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="block py-2 pr-4 pl-3 duration-200  text-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0  dark:text-white"
                >
                  Our Services
                </button>
                {dropdownOpen && (
                  <ul className="absolute bg-white dark:bg-gray-900  dark:text-white text-gray-700 border rounded-md shadow-lg mt-2 w-40 z-50">
                    <li>
                      <NavLink
                        to="/services/tours"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Tour Packages
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/services/flights"
                        className="block px-4 py-2 hover:bg-gray-100  dark:hover:bg-gray-700"
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Flight Booking
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/services/hotels"
                        className="block px-4 py-2 hover:bg-gray-100  dark:hover:bg-gray-700"
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Hotel Booking
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive, isPending }) =>
                    `block py-2 pr-4 pl-3 duration-200  ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0 dark:text-white`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink
                    to={location.pathname.startsWith("/admin") ? "/" : "/admin"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200  ${
                        isActive ? "text-blue-700" : "text-gray-700"
                      } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0 dark:text-white`
                    }
                  >
                    {location.pathname.startsWith("/admin")
                      ? "View Site"
                      : "Admin Panel"}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
