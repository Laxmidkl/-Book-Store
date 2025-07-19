import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import Img from "../assets/navLogo.png";
import backgroundImage from "../assets/backgroundImg.jpg";

import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  // const token = localStorage.getItem("token");

  const handleLogOut = () => {
    logout();
  };

  return (
    <header
      className="max-w-screen-2xl mx-auto px-10 py-6 h-24 text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <nav className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center gap-4 md:gap-16">
          {/* Logo */}
          <div className="h-13 w-13 flex items-center justify-center">
            <img src={Img} alt="logo" className="rounded-full size-10" />
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-15 font-semibold ml-40">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Contact Us
            </Link>
          </div>

          {/* Search Input */}
          <div className="relative sm:w-72 w-40 ml-5">
            <IoSearchOutline className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-tertiary w-full py-1 md:px-8 px-7 rounded-md outline-none pl-8 pr-2 text-black"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center gap-3">
          {/* Auth / User Icon */}
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40 text-black">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to=  
                            // {item.href}
                            
                            {
                                item.name === "Dashboard"
                                ? (localStorage.getItem("token") ?  "/admin" : "/dashboard"  )
                                : item.href
                            }
                            className="block px-4 py-2 text-sm hover:bg-gray-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={()=>{
                            handleLogOut();
                            setIsDropdownOpen(false);

                          }
                        }
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>



            {/* <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="avatar"
                    className={`size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40 text-black">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={
                              item.name === "Dashboard"
                                ? (localStorage.getItem("token") ?   "/admin" : "/dashboard"  )
                                : item.href
                            }
                            className="block px-4 py-2 text-sm hover:bg-gray-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div> */}

          {/* Wishlist Icon */}
          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
