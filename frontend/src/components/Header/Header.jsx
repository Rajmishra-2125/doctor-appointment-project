import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-gray-900 shadow-md border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen">
          <Link to="/" className="flex items-center">
            <img
              src="https://media.istockphoto.com/id/184364634/photo/stethoscope.jpg?s=612x612&w=0&k=20&c=kkJWBFleK7Qo-IdB6wHR1d0QH9KQ2yRT9HplAxEuhRA="
              className="mr-3 h-12 rounded-xl mx-3"
              alt="Logo"
            />
            <div>
              <h1 class="text-xl font-medium text-white">MediCare</h1>
              <p class="text-xs text-white">Healthcare Solutions</p>
            </div>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-white border-0 hover:border-blue-600 bg-orange-600 hover:bg-indigo-600 focus:ring-5 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Login/Signup
            </Link>
          </div>
          <div
            className="hidden justify-start items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-white text-sm block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/doctors"
                  className={({ isActive }) =>
                    `text-white text-sm block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Doctors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="doctors/appointments"
                  className={({ isActive }) =>
                    `text-white text-sm block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `text-white text-sm block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-white text-sm block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-white text-sm block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="hidden justify-start items-center w-full lg:flex lg:w-auto lg:order-1">
            <input
              type="text"
              
              className="block w-full pl-5 pr-4 py-2 text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-2 hover:border-indigo-500 focus:border-2 focus:border-indigo-500 sm:text-sm"
              placeholder="Search Doctors..."
            ></input>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
