import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateUniqueId } from "esewajs";
import axios from "axios";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/checkout"); // fallback if no order data
    }
  }, [orderData]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/initiate-payment",
        {
          amount: orderData.totalPrice,
          productId: generateUniqueId(),
        }
      );

      // Save order data temporarily to localStorage for success page
      localStorage.setItem("pendingOrder", JSON.stringify(orderData));

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Confirm Payment</h1>
      <p>
        <strong>Total Items:</strong> {orderData?.totalItems}
      </p>
      <p>
        <strong>Total Amount:</strong> Rs. {orderData?.totalPrice}
      </p>

      <form onSubmit={handlePayment}>
        <button
          type="submit"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
