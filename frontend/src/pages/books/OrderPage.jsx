// // import React from 'react'
// // import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
// // import { useAuth } from '../../context/AuthContext';

// // const OrderPage = () => {
// //     const { currentUser} = useAuth()


// //     const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
// //     if (isLoading) return <div>Loading...</div>
// //     if (isError) return <div>Error geting orders data</div>
// //     return (
// //         <div className='container mx-auto p-6'>
// //             <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
// //             {
// //                 orders.length === 0 ? (<div>No orders found!</div>) : (<div>
// //                     {
// //                         orders.map((order, index) => (
// //                             <div key={order._id} className="border-b mb-4 pb-4">
// //                                 <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
// //                                 <h2 className="font-bold">Order ID: {order._id}</h2>
// //                                 <p className="text-gray-600">Name: {order.name}</p>
// //                                 <p className="text-gray-600">Email: {order.email}</p>
// //                                 <p className="text-gray-600">Phone: {order.phone}</p>
// //                                 <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
// //                                 <h3 className="font-semibold mt-2">Address:</h3>
// //                                 <p> {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
// //                                 <h3 className="font-semibold mt-2">Products Id:</h3>
// //                                 <ul>
// //                                     {order.productIds.map((productId) => (
// //                                         <li key={productId}>{productId}</li>
// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                         ))
// //                     }
// //                 </div>)
// //             }
// //         </div>
// //     )
// // }

// // export default OrderPage



// import React from 'react'
// import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
// import { useAuth } from '../../context/AuthContext';

// const OrderPage = () => {
//   const { currentUser } = useAuth();
//   const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

//   if (isLoading) return <div className="text-center p-8">Loading orders...</div>
//   if (isError) return <div className="text-center p-8 text-red-600">Error loading orders</div>

//   return (
//     <div className='container mx-auto p-6'>
//       <h2 className='text-2xl font-semibold mb-6'>Your Order History</h2>
//       {orders.length === 0 ? (
//         <div className="text-center p-8 bg-gray-100 rounded-lg">
//           <p>No orders found!</p>
//           <p className="mt-2">Start shopping to see your orders here.</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order, index) => (
//             <div key={order._id} className="border rounded-lg p-6 shadow-sm">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
//                     Order #{index + 1}
//                   </span>
//                   <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   order.paymentStatus === "COMPLETE" 
//                     ? "bg-green-100 text-green-800" 
//                     : "bg-yellow-100 text-yellow-800"
//                 }`}>
//                   {order.paymentStatus}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <h3 className="font-medium text-gray-700">Customer Details</h3>
//                   <p className="text-gray-600">Name: {order.name}</p>
//                   <p className="text-gray-600">Email: {order.email}</p>
//                   <p className="text-gray-600">Phone: {order.phone}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-700">Payment Details</h3>
//                   <p className="text-gray-600">Total: Rs. {order.totalPrice}</p>
//                   <p className="text-gray-600">Method: {order.paymentMethod}</p>
//                   <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-700">Shipping Address</h3>
//                 <p className="text-gray-600">
//                   {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-medium text-gray-700">Products ({order.productIds?.length || 0})</h3>
//                 <ul className="mt-2 space-y-1">
//                   {order.productIds?.map((product) => (
//                     <li key={product._id} className="text-gray-600">
//                       {product.title || product._id} (Rs. {product.price})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// export default OrderPage;




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
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-semibold mb-6'>Order Details</h2>
      
      <div className="border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
            <p className="text-gray-600">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.paymentStatus === "COMPLETE" 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {order.paymentStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-medium text-gray-700">Customer Details</h3>
            <p className="text-gray-600">Name: {order.name}</p>
            <p className="text-gray-600">Email: {order.email}</p>
            <p className="text-gray-600">Phone: {order.phone}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Payment Details</h3>
            <p className="text-gray-600">Total: Rs. {order.totalPrice}</p>
            <p className="text-gray-600">Method: {order.paymentMethod}</p>
            <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700">Shipping Address</h3>
          <p className="text-gray-600">
            {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700">Products ({order.productIds?.length || 0})</h3>
          <ul className="mt-2 space-y-1">
            {order.productIds?.map((product) => (
              <li key={product._id} className="text-gray-600">
                {product.title || product._id} (Rs. {product.price})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;