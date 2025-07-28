
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

// Icons from react-icons
import {
  FiHome,
  FiBookOpen,
  FiPlus,
  FiShoppingCart,
  FiUsers,
  FiFileText,
} from 'react-icons/fi';

const DashboardLayout = () => {
  const { currentUser } = useAuth();
  const profileLetter = currentUser?.email?.charAt(0).toUpperCase() || 'A';

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100 mt-28">
        {/* Sidebar */}
        <div className="w-16 md:w-64 bg-gray-800 text-white p-2 md:p-4 flex flex-col transition-all duration-300">
          {/* Profile Section */}
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold mr-0 md:mr-3">
              {profileLetter}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-300">{currentUser?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <Link
              to="/dashboard"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded hover:bg-gray-700"
            >
              <FiHome className="text-white text-lg" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link  to="/dashboard/manage-books"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded hover:bg-gray-700"
            >
              <FiBookOpen className="text-white text-lg" />
              <span className="hidden md:inline">Manage Books</span>
            </Link>
            <Link
              to="/dashboard/add-book"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded hover:bg-gray-700"
            >
              <FiPlus className="text-white text-lg" />
              <span className="hidden md:inline">Add New Book</span>
            </Link>
            <Link
              to="/dashboard/orders"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded hover:bg-gray-700"
            >
              <FiShoppingCart className="text-white text-lg" />
              <span className="hidden md:inline">Manage Orders</span>
            </Link>
            <Link
              to="/dashboard/users"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded hover:bg-gray-700"
            >
              <FiUsers className="text-white text-lg" />
              <span className="hidden md:inline">Manage Users</span>
            </Link>
            <Link
              to="/dashboard/payment-reports"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded hover:bg-gray-700"
            >
              <FiFileText className="text-white text-lg" />
              <span className="hidden md:inline">Payment Reports</span>
            </Link>
          </nav>

          {/* Logout Button (Optional) */}
          {/* <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700 mt-4"
          >
            Logout
          </button> */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
