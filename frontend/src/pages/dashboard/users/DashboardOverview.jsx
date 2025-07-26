// DashboardOverview.jsx
import React from 'react';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { useAuth } from '../../../context/AuthContext';

const DashboardOverview = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  // Calculate stats here
  const totalOrders = orders.length;
  const totalSpent = orders
    .filter(order => order.paymentStatus === "COMPLETE")
    .reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(order => order.paymentStatus === "PENDING").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Orders</h3>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Spent</h3>
          <p className="text-3xl font-bold">Rs. {totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Pending Orders</h3>
          <p className="text-3xl font-bold">{pendingOrders}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">Welcome back to your dashboard!</p>
      </div>
    </div>
  );
};

export default DashboardOverview;