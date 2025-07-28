import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Img from "../assets/navLogo.png";
import backgroundImage from "../assets/backgroundImg.jpg";

import axios from "axios";

const userNavigation = [
  { name: "My Profile", href: "/profile" },
  { name: "Dashboard", href: "/user-dashboard" },
];

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage Books", href: "/dashboard/manage-books" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const getUserInitials = (full = "") => {
    if (!full) return "";
    const parts = full.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.role === "admin") {
          setAdminData(decoded);
        }
      } catch (err) {
        console.error("Invalid admin token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = async () => {
    if (adminData) {
      localStorage.removeItem("token");
      setAdminData(null);
      setIsDropdownOpen(false);
      navigate("/");
    } else {
      await logout();
      setIsDropdownOpen(false);
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    alert(`Searching for "${query}" - add your logic!`);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const renderProfile = () => {
    if (currentUser) {
      const name =
        currentUser.fullName || currentUser.displayName || currentUser.email;
      return {
        initials: getUserInitials(name),
        email: currentUser.email,
        isAdmin: false,
      };
    } else if (adminData) {
      return {
        initials: getUserInitials(adminData.email),
        email: adminData.email,
        isAdmin: true,
      };
    }
    return null;
  };

  const profile = renderProfile();
  const isAdmin = profile?.isAdmin;

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data.books || response.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredBooks([]);
    } else {
      const filtered = books.filter((book) => {
        const q = query.toLowerCase();
        return (
          book.title?.toLowerCase().includes(q) ||
          book.author?.toLowerCase().includes(q)
        );
      });
      setFilteredBooks(filtered);
    }
  }, [query, books]);

  return (
    <header
      className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 py-4 md:py-6 text-white fixed top-0 left-0 w-full z-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <nav className="flex justify-between items-center h-full ">
        <div className="flex items-center gap-4">
          <img
            src={Img}
            alt="logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </button>
        </div>

        <div
          className={`md:flex items-center gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent text-black md:text-white shadow-md md:shadow-none transition-all duration-300 ease-in-out z-40 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center md:gap-24 gap-3 p-4 md:p-0">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            <div className="relative w-full md:w-72">
              <IoSearchOutline
                onClick={handleSearch}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              />
              <input
                type="text"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white text-black w-full py-2 pl-8 pr-2 rounded-md outline-none"
              />

              {filteredBooks.length > 0 && (
                <ul className="absolute w-full z-50 mt-1 bg-black bg-opacity-80 text-white shadow-md rounded-md p-2">
                  {filteredBooks.map((book) => (
                    <li
                      key={book._id || book.id}
                      className="hover:bg-blue-700 rounded-md p-2 transition-colors"
                    >
                      <Link
                        to={`/books/${book._id || book.id}`}
                        onClick={() => setQuery("")}
                        className="block"
                      >
                        <div className="font-semibold text-white">
                          {book.title}
                        </div>
                        <div className="text-sm text-gray-300">
                          by {book.author}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-4 text-white">
          {profile ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold">
                  {profile.initials}
                </div>
                <span className="text-xs block mt-1 max-w-[100px] truncate text-center">
                  {profile.email}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <ul>
                    {(isAdmin ? adminNavigation : userNavigation).map(
                      (item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="font-semibold hover:text-primary">
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 font-semibold hover:text-primary"
              >
                Register
              </Link>
            </>
          )}

          <button className="hidden sm:block hover:text-primary">
            <HiOutlineHeart className="w-6 h-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-2 flex items-center rounded-md hover:bg-blue-700 relative"
          >
            <HiOutlineShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
