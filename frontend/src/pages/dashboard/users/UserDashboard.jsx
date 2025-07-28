import React from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import { FiHome, FiShoppingBag, FiCreditCard, FiLogOut } from "react-icons/fi";

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { data: orders = [], isLoading } = useGetOrderByEmailQuery(
    currentUser?.email
  );
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100  ">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center ">
        <div>
          <h2 className="text-lg font-semibold truncate max-w-[180px] ">
            {currentUser.fullName}
          </h2>
        </div>
      </div>

      {/* Sidebar - Mobile (Bottom) and Desktop (Left) */}
      <div className="md:w-64 bg-gray-900 text-white shadow-md fixed bottom-0 left-0 right-0 md:static md:bottom-auto z-10">
        <div className="hidden md:block p-4 border-b">
          <h2 className="text-xl font-semibold">{currentUser.fullName}</h2>
          <p className="text-sm text-white">{currentUser?.email}</p>
        </div>
        <nav className="p-2 md:p-4">
          <ul className="flex md:flex-col justify-around md:justify-start md:space-y-2">
            <li className="flex-1 md:flex-none">
              <Link
                to="/user-dashboard"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-3 py-2 md:px-4 md:py-2 rounded-md font-semibold ${
                  isActive("/user-dashboard")
                    ? "bg-blue-100 text-blue-600"
                    : "text-white hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <FiHome className="text-xl md:text-lg md:mr-2" />
                <span className="text-xs md:text-base mt-1 md:mt-0 hidden md:inline">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="flex-1 md:flex-none">
              <Link
                to="/user-dashboard/orders"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-3 py-2 md:px-4 md:py-2 rounded-md font-semibold ${
                  isActive("/user-dashboard/orders")
                    ? "bg-blue-100 text-blue-600"
                    : "text-white hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <FiShoppingBag className="text-xl md:text-lg md:mr-2" />
                <span className="text-xs md:text-base mt-1 md:mt-0 hidden md:inline">
                  My Orders
                </span>
              </Link>
            </li>
            <li className="flex-1 md:flex-none">
              <Link
                to="/user-dashboard/payment-history"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-3 py-2 md:px-4 md:py-2 rounded-md font-semibold ${
                  isActive("/user-dashboard/payment-history")
                    ? "bg-blue-100 text-blue-600"
                    : "text-white hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <FiCreditCard className="text-xl md:text-lg md:mr-2" />
                <span className="text-xs md:text-base mt-1 md:mt-0 hidden md:inline">
                  Payments
                </span>
              </Link>
            </li>
            <li className="flex-1 md:flex-none">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex flex-col md:flex-row items-center justify-center md:justify-start w-full text-left px-3 py-2 md:px-4 md:py-2 font-semibold text-white hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                <FiLogOut className="text-xl md:text-lg md:mr-2" />
                <span className="text-xs md:text-base mt-1 md:mt-0 hidden md:inline">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mb-16 md:mb-0">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
