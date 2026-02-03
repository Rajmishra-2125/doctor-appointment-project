import React from 'react'
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-9xl mx-7 px-2 sm:px-4 lg:px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div>
            <div className="shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="https://media.istockphoto.com/id/184364634/photo/stethoscope.jpg?s=612x612&w=0&k=20&c=kkJWBFleK7Qo-IdB6wHR1d0QH9KQ2yRT9HplAxEuhRA="
                  className="mr-3 h-12 rounded-xl mx-3"
                  alt="Logo"
                />
                <div>
                  <h1 class="text-xl font-medium text-white">MediCare</h1>
                  <p class="text-xs text-center text-white">
                    Healthcare Solutions
                  </p>
                </div>
              </Link>
            </div>
            <span className="mt-4 items-start gap-0 text-sm text-gray-400">
              Your trusted partner in healthcare. Quality medical services at
              your fingertips.
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">Quick Links</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:underline hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="hover:underline hover:text-gray-400"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:underline hover:text-gray-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:underline hover:text-gray-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="hover:underline hover:text-gray-400"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm space-y-1 font-semibold text-white mb-4">
              For patients
            </p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Search for Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Search for Clinics
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Search for Hospitals
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Check Slots
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Book Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Cancel Appointments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm space-y-2 font-semibold text-white mb-4">
              For Doctors
            </p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Create Slots
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Booked Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Cancelled Appointments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">More</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Private Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4">Connect</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:underline hover:text-gray-400"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 mb-4 pt-2 pb-2 border-t items-center border-gray-800 ">
          <span className="text-sm text-gray-500 sm:text-center">
            copyright© 2023, {" "}
            <a href="https://hiteshchoudhary.com/" className="hover:underline">
              Medicare
            </a>
             . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer
