import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 py-12 px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-gray-700">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-1/2">
            {/* Book Image */}
            <div className="w-48 h-64 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 hover:-translate-y-1 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Book Stack"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            <div className="w-full">
              <p className="text-gray-400 text-sm mb-4">
                Receive the latest updates, news, and exclusive offers!
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:flex-row gap-8 w-full md:w-1/2">
            {/* Quick Links */}
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-500">
                Quick Links
              </h4>

              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <Link
                    to="/"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Link
                    to="/about"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <span>About Us</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Link
                    to="/"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <span>Categories</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Store Info */}
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-500">
                Store Information
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <MdLocationOn className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                  <span>Email:support@bookbazar.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MdPhone className="text-blue-500 text-lg" />
                  <span>+977-9800000000</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MdAccessTime className="text-blue-500 text-lg" />
                  <span>Sunday to Friday, 10 AM – 6 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center gap-6 pt-8">
          {/* Social Icons */}
          <div className="flex gap-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-100 bg-gray-700 w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all"
                >
                  <Icon className="text-lg" />
                </a>
              )
            )}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} BookStore App. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
