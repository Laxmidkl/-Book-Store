import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { orderId } = useParams();
  const { currentUser } = useAuth();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <div className="text-center p-8">Loading order details...</div>;
  if (isError) return <div className="text-center p-8 text-red-600">Error loading order details</div>;
  if (!order) return <div className="text-center p-8">Order not found</div>;

  return (
    <div className='container mx-auto px-4 py-6 sm:px-6'>
      <h2 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-6'>Order Details</h2>
      
      <div className="border rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">Order ID: {order._id}</h2>
            <p className="text-sm sm:text-base text-gray-600">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
            order.paymentStatus === "COMPLETE" 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {order.paymentStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-700 text-sm sm:text-base">Customer Details</h3>
            <p className="text-gray-600 text-sm sm:text-base">Name: {order.name}</p>
            <p className="text-gray-600 text-sm sm:text-base">Email: {order.email}</p>
            <p className="text-gray-600 text-sm sm:text-base">Phone: {order.phone}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-700 text-sm sm:text-base">Payment Details</h3>
            <p className="text-gray-600 text-sm sm:text-base">Total: Rs.{order.totalPrice}</p>
            <p className="text-gray-600 text-sm sm:text-base">Method: {order.paymentMethod}</p>
            <p className="text-gray-600 text-sm sm:text-base">Date: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-4 bg-gray-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-700 text-sm sm:text-base">Shipping Address</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-700 text-sm sm:text-base">Products</h3>
          <ul className="mt-1 space-y-1">
            {order.productIds?.map((product, index) => (
              <li key={product._id || product || index} className="text-gray-600 text-sm sm:text-base">
                {typeof product === 'object' 
                  ? `${product.title || 'Product'} (Qty: ${product.quantity || 1})`
                  : `Product ID: ${product}`
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;