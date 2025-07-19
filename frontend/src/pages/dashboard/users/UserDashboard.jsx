import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(
    currentUser?.email
  );

  if (isLoading)
    return <div className="text-center mt-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading your orders.
      </div>
    );

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  // Prepare data for chart
  const chartData = orders.map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    total: order.totalPrice,
  }));

  // Function to get initials from name or email
  const getUserInitials = (name = "") => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <div className="bg-gray-100 py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-10">
        {/* User Info */}
        <div className="flex flex-col items-center space-y-2">
          {currentUser?.profile ? (
            <img
              src={currentUser.profile}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-purple-500"
            />
          ) : (
            <div className="bg-purple-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-purple-500">
              {getUserInitials(currentUser?.fullName || currentUser?.email)}
            </div>
          )}
          <h1 className="text-3xl font-bold text-purple-700">
            Welcome, {currentUser?.name || "User"}!
          </h1>
          <p className="text-gray-600 text-sm">{currentUser?.email}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-100 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-800">Total Orders</h2>
            <p className="text-3xl font-bold text-purple-900">{totalOrders}</p>
          </div>
          <div className="bg-green-100 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800">Total Spent</h2>
            <p className="text-3xl font-bold text-green-900">
              Rs.{totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Spending Over Time
          </h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No spending data to display yet.</p>
          )}
        </div>

        {/* Order Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-gray-700">
                      Order ID:{" "}
                      <span className="text-gray-900">{order._id}</span>
                    </p>
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Total: Rs.{order.totalPrice.toFixed(2)}
                  </p>

                  <div className="ml-4">
                    <p className="font-medium text-gray-700">Products:</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {order.productIds.map((productId, index) => (
                        <li key={index}>{productId}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                      View Invoice
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      Reorder
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You haven’t placed any orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;