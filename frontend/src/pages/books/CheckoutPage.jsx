


// // import React, { useState } from 'react'
// // import { useSelector } from 'react-redux';
// // import { useForm } from "react-hook-form"
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';

// // import Swal from'sweetalert2';
// // import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

// // const CheckoutPage = () => {
// //     const cartItems = useSelector(state => state.cart.cartItems);
// //     const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
// //     const {  currentUser} = useAuth()
// //     const {
// //         register,
// //         handleSubmit,
// //         watch,
// //         formState: { errors },
// //     } = useForm()

// //     const [createOrder, {isLoading, error}] = useCreateOrderMutation();
// //     const navigate =  useNavigate()

// //     const [isChecked, setIsChecked] = useState(false)
// //     const onSubmit = async (data) => {
     
// //         const newOrder = {
// //             name: data.name,
// //             email: currentUser?.email,
// //             address: {
// //                 city: data.city,
// //                 country: data.country,
// //                 state: data.state,
// //                 zipcode: data.zipcode
        
// //             },
// //             phone: data.phone,
// //             productIds: cartItems.map(item => item?._id),
// //             totalPrice: totalPrice,
// //         }
        
// //         try {
// //             await createOrder(newOrder).unwrap();
// //             Swal.fire({
// //                 title: "Confirmed Order",
// //                 text: "Your order placed successfully!",
// //                 icon: "warning",
// //                 showCancelButton: true,
// //                 confirmButtonColor: "#3085d6",
// //                 cancelButtonColor: "#d33",
// //                 confirmButtonText: "Yes, It's Okay!"
// //               });
// //               navigate("/orders")
// //         } catch (error) {
// //             console.error("Error place an order", error);
// //             alert("Failed to place an order")
// //         }
// //     }

// //     if(isLoading) return <div>Loading....</div>
// //     return (
// //         <section>
// //             <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
// //                 <div className="container max-w-screen-lg mx-auto">
// //                     <div>
// //                         <div>
// //                             <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delevary</h2>
// //                             <p className="text-gray-500 mb-2">Total Price: Rs.{totalPrice}</p>
// //                             <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
// //                         </div>

                        
// //                             <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
// //                                 <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
// //                                     <div className="text-gray-600">
// //                                         <p className="font-medium text-lg">Personal Details</p>
// //                                         <p>Please fill out all the fields.</p>
// //                                     </div>

// //                                     <div className="lg:col-span-2">
// //                                         <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
// //                                             <div className="md:col-span-5">
// //                                                 <label htmlFor="full_name">Full Name</label>
// //                                                 <input
// //                                                     {...register("name", { required: true })}
// //                                                     type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
// //                                             </div>

// //                                             <div className="md:col-span-5">
// //                                                 <label html="email">Email Address</label>
// //                                                 <input

// //                                                     type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
// //                                                     disabled
// //                                                     defaultValue={currentUser?.email}
// //                                                     placeholder="email@domain.com" />
// //                                             </div>
// //                                             <div className="md:col-span-5">
// //                                                 <label html="phone">Phone Number</label>
// //                                                 <input
// //                                                     {...register("phone", { required: true })}
// //                                                     type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
// //                                             </div>

// //                                             <div className="md:col-span-3">
// //                                                 <label htmlFor="address">Address / Street</label>
// //                                                 <input
// //                                                     {...register("address", { required: true })}
// //                                                     type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
// //                                             </div>

// //                                             <div className="md:col-span-2">
// //                                                 <label htmlFor="city">City</label>
// //                                                 <input
// //                                                     {...register("city", { required: true })}
// //                                                     type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
// //                                             </div>

// //                                             <div className="md:col-span-2">
// //                                                 <label htmlFor="country">Country / region</label>
// //                                                 <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
// //                                                     <input
// //                                                         {...register("country", { required: true })}
// //                                                         name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
// //                                                     <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
// //                                                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                                                             <line x1="18" y1="6" x2="6" y2="18"></line>
// //                                                             <line x1="6" y1="6" x2="18" y2="18"></line>
// //                                                         </svg>
// //                                                     </button>
// //                                                     <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
// //                                                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
// //                                                     </button>
// //                                                 </div>
// //                                             </div>

// //                                             <div className="md:col-span-2">
// //                                                 <label htmlFor="state">State / province</label>
// //                                                 <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
// //                                                     <input
// //                                                         {...register("state", { required: true })}
// //                                                         name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
// //                                                     <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
// //                                                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                                                             <line x1="18" y1="6" x2="6" y2="18"></line>
// //                                                             <line x1="6" y1="6" x2="18" y2="18"></line>
// //                                                         </svg>
// //                                                     </button>
// //                                                     <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
// //                                                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
// //                                                     </button>
// //                                                 </div>
// //                                             </div>

// //                                             <div className="md:col-span-1">
// //                                                 <label htmlFor="zipcode">Zipcode</label>
// //                                                 <input
// //                                                     {...register("zipcode", { required: true })}
// //                                                     type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
// //                                             </div>

// //                                             <div className="md:col-span-5 mt-3">
// //                                                 <div className="inline-flex items-center">
// //                                                     <input
// //                                                         onChange={(e) => setIsChecked(e.target.checked)}
// //                                                         type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
// //                                                     <label htmlFor="billing_same" className="ml-2 ">I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
// //                                                 </div>
// //                                             </div>



// //                                             <div className="md:col-span-5 text-right">
// //                                                 <div className="inline-flex items-end">
// //                                                     <button
// //                                                         disabled={!isChecked}
// //                                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place an Order</button>
// //                                                 </div>
// //                                             </div>

// //                                         </div>
// //                                     </div>
// //                                 </form>
// //                             </div>

// //                     </div>


// //                 </div>
// //             </div>
// //         </section>
// //     )
// // }

// // export default CheckoutPage




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { useAuth } from "../../context/AuthContext";

// function CheckoutPage() {
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const { currentUser } = useAuth();
//   const [isChecked, setIsChecked] = useState(false);

//   const totalPrice = cartItems
//     .reduce((acc, item) => acc + item.newPrice, 0)
//     .toFixed(2);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const newOrder = {
//       name: data.name,
//       email: currentUser?.email,
//       address: {
//         city: data.city,
//         country: data.country,
//         state: data.state,
//         zipcode: data.zipcode,
//       },
//       phone: data.phone,
//       productIds: cartItems.map((item) => item?._id),
//       totalPrice: totalPrice,
//       totalItems: cartItems.length,
//     };

//     // ✅ Navigate to payment page with order info
//     navigate("/payment", { state: newOrder });
//   };

//   return (
//     <section>
//       <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//         <div className="container max-w-screen-lg mx-auto">
//           <div>
//             <h2 className="font-semibold text-xl text-gray-600 mb-2">
//               eSewa Payment
//             </h2>
//             <p className="text-gray-500 mb-2">Rs.{totalPrice}</p>
//             <p className="text-gray-500 mb-6">
//               Items: {cartItems.length > 0 ? cartItems.length : 0}
//             </p>

//             <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3 my-8"
//               >
//                 <div className="text-gray-600">
//                   <p className="font-medium text-lg">Personal Details</p>
//                   <p>Please fill out all the fields.</p>
//                 </div>

//                 <div className="lg:col-span-2">
//                   <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
//                     <div className="md:col-span-5">
//                       <label htmlFor="name">Full Name</label>
//                       <input
//                         {...register("name", { required: true })}
//                         type="text"
//                         id="name"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-xs mt-1">Name is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-5">
//                       <label htmlFor="email">Email Address</label>
//                       <input
//                         type="text"
//                         id="email"
//                         disabled
//                         defaultValue={currentUser?.email}
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     <div className="md:col-span-5">
//                       <label htmlFor="phone">Phone Number</label>
//                       <input
//                         {...register("phone", { required: true })}
//                         type="number"
//                         id="phone"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.phone && (
//                         <p className="text-red-500 text-xs mt-1">Phone is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-3">
//                       <label htmlFor="address">Address / Street</label>
//                       <input
//                         {...register("address", { required: true })}
//                         type="text"
//                         id="address"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.address && (
//                         <p className="text-red-500 text-xs mt-1">Address is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="city">City</label>
//                       <input
//                         {...register("city", { required: true })}
//                         type="text"
//                         id="city"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.city && (
//                         <p className="text-red-500 text-xs mt-1">City is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="country">Country</label>
//                       <input
//                         {...register("country", { required: true })}
//                         type="text"
//                         id="country"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.country && (
//                         <p className="text-red-500 text-xs mt-1">Country is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="state">State</label>
//                       <input
//                         {...register("state", { required: true })}
//                         type="text"
//                         id="state"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.state && (
//                         <p className="text-red-500 text-xs mt-1">State is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-1">
//                       <label htmlFor="zipcode">Zipcode</label>
//                       <input
//                         {...register("zipcode", { required: true })}
//                         type="text"
//                         id="zipcode"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                       {errors.zipcode && (
//                         <p className="text-red-500 text-xs mt-1">Zipcode is required.</p>
//                       )}
//                     </div>

//                     <div className="md:col-span-5 mt-3">
//                       <div className="inline-flex items-center">
//                         <input
//                           type="checkbox"
//                           onChange={(e) => setIsChecked(e.target.checked)}
//                           className="form-checkbox"
//                         />
//                         <label htmlFor="billing_same" className="ml-2">
//                           I agree to the{" "}
//                           <Link className="underline text-blue-600">Terms & Conditions</Link> and{" "}
//                           <Link className="underline text-blue-600">Shopping Policy</Link>.
//                         </label>
//                       </div>
//                     </div>

//                     <div className="md:col-span-5 text-right">
//                       <button
//                         type="submit"
//                         disabled={!isChecked}
//                         className={`${
//                           isChecked
//                             ? "bg-green-500 hover:bg-green-600"
//                             : "bg-gray-300 cursor-not-allowed"
//                         } text-white font-bold py-2 px-4 rounded`}
//                       >
//                         Place an order
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CheckoutPage;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function CheckoutPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCashOnDelivery = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const newOrder = {
        name: formData.name,
        email: currentUser?.email,
        address: {
          city: formData.city,
          country: formData.country,
          state: formData.state,
          zipcode: formData.zipcode,
        },
        phone: formData.phone,
        productIds: cartItems.map((item) => item?._id),
        totalPrice: totalPrice,
        totalItems: cartItems.length,
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "PENDING"
      };

      const response = await axios.post("http://localhost:5000/api/orders", newOrder);
      
      navigate("/order-confirmation", { 
        state: { 
          orderId: response.data._id,
          paymentMethod: "CASH_ON_DELIVERY"
        } 
      });
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEsewaPayment = (formData) => {
    const newOrder = {
      name: formData.name,
      email: currentUser?.email,
      address: {
        city: formData.city,
        country: formData.country,
        state: formData.state,
        zipcode: formData.zipcode,
      },
      phone: formData.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
      totalItems: cartItems.length,
      paymentMethod: "ESEWA",
      paymentStatus: "PENDING"
    };

    localStorage.setItem("pendingOrder", JSON.stringify(newOrder));
    navigate("/payment", { state: newOrder });
  };

  const onSubmit = (data) => {
    if (paymentMethod === "esewa") {
      handleEsewaPayment(data);
    } else {
      handleCashOnDelivery(data);
    }
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
            <p className="text-gray-500 mb-2">Rs.{totalPrice}</p>
            <p className="text-gray-500 mb-6">
              Items: {cartItems.length > 0 ? cartItems.length : 0}
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">Name is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        id="email"
                        disabled
                        defaultValue={currentUser?.email}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register("phone", { required: true })}
                        type="number"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">Phone is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">Address is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">City is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country</label>
                      <input
                        {...register("country", { required: true })}
                        type="text"
                        id="country"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">Country is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State</label>
                      <input
                        {...register("state", { required: true })}
                        type="text"
                        id="state"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">State is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register("zipcode", { required: true })}
                        type="text"
                        id="zipcode"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.zipcode && (
                        <p className="text-red-500 text-xs mt-1">Zipcode is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label className="font-medium text-gray-700 mb-2 block">
                        Payment Method
                      </label>
                      <div className="flex flex-col space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio"
                            name="paymentMethod"
                            value="esewa"
                            checked={paymentMethod === "esewa"}
                            onChange={() => setPaymentMethod("esewa")}
                          />
                          <span className="ml-2">Pay with eSewa</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                          />
                          <span className="ml-2">Cash on Delivery</span>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          onChange={(e) => setIsChecked(e.target.checked)}
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{" "}
                          <Link className="underline text-blue-600">Terms & Conditions</Link> and{" "}
                          <Link className="underline text-blue-600">Shopping Policy</Link>.
                        </label>
                      </div>
                    </div>

                    {error && (
                      <div className="md:col-span-5 text-red-500">
                        {error}
                      </div>
                    )}

                    <div className="md:col-span-5 text-right">
                      <button
                        type="submit"
                        disabled={!isChecked || isSubmitting}
                        className={`${
                          isChecked
                            ? paymentMethod === "esewa"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-300 cursor-not-allowed"
                        } text-white font-bold py-2 px-4 rounded`}
                      >
                        {isSubmitting ? (
                          "Processing..."
                        ) : paymentMethod === "esewa" ? (
                          "Pay with eSewa"
                        ) : (
                          "Place Order (Cash on Delivery)"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;




