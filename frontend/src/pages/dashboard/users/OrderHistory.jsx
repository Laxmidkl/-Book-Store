
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOrderByEmailQuery, useDeleteOrderMutation } from '../../../redux/features/orders/ordersApi';
import { useAuth } from '../../../context/AuthContext';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, error } = useGetOrderByEmailQuery(currentUser?.email);
  const [deleteOrder] = useDeleteOrderMutation();
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.paymentStatus === filter.toUpperCase();
  });

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(orderId).unwrap();
        alert('Order deleted successfully');
      } catch (error) {
        alert('Failed to delete order');
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleViewDetails = (orderId) => {
    navigate(`/user-dashboard/orders/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center text-red-500">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
    

       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">         <h1 className="text-xl sm:text-2xl font-bold">My Orders</h1>
     <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md px-3 py-2 w-full sm:w-auto "
        >
          <option className='text-xs' value="all">All Orders</option>
          <option  className='text-xs' value="complete">Completed</option>
          <option  className='text-xs' value="pending">Pending</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm sm:text-base">No orders found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h2>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  order.paymentStatus === "COMPLETE"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {order.paymentStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">Products</h3>
                  <ul className="mt-1 text-sm text-gray-600">
                    {order.productIds?.map((product) => (
                      <li key={product._id || product}>
                        {typeof product === 'object'
                          ? `${product.title || 'Product'}`
                          : `Product ID: ${product}`}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">Total</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Rs. {order.totalPrice}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">Payment Method</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                {order.paymentStatus === "PENDING" && (
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => handleViewDetails(order._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
