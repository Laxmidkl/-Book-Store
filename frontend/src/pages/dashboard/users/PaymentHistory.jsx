import React from "react";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import { useAuth } from "../../../context/AuthContext";

const PaymentHistory = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    error,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return <div className="text-center p-4">Loading payment history...</div>;
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center text-red-500">
        Error loading payment history
      </div>
    );
  }

  const paymentHistory = Array.isArray(orders)
    ? orders.map((order) => ({
        id: order._id,
        date: new Date(order.createdAt).toLocaleDateString(),
        amount: order.totalPrice,
        method: order.paymentMethod,
        status: order.paymentStatus,
      }))
    : [];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Payment History</h1>

      {paymentHistory.length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-600">No payment history found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                    {payment.id.slice(-6)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                    Rs. {payment.amount}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                    {payment.method}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === "COMPLETE"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
