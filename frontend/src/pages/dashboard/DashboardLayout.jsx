// import React, { useEffect, useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { HiViewGridAdd } from "react-icons/hi";
// import { MdOutlineManageHistory } from "react-icons/md";
// import { jwtDecode } from 'jwt-decode';
// // import Sidebar from './Sidebar';


// const DashboardLayout = () => {
//   const [adminData, setAdminData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded?.role === "admin") {
//           setAdminData(decoded);
//         }
//       } catch (err) {
//         console.error("Invalid token");
//         localStorage.removeItem("token");
//         navigate("/admin");
//       }
//     } else {
//       navigate("/admin");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setAdminData(null);
//     navigate("/");
//   };

//   const getInitial = (email = "") => {
//     return email?.charAt(0)?.toUpperCase() || "A";
//   };

//   return (
//     <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
//       {/* Sidebar */}
//       <aside className="hidden sm:flex sm:flex-col">
//         {/* <Sidebar/> */}
//       </aside>

//       {/* Main content */}
//       <div className="flex-grow text-gray-800">
//         <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
//           {/* ... other header elements ... */}

//           <div className="flex flex-shrink-0 items-center ml-auto">
//             <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
//               <span className="sr-only">User Menu</span>

//               <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-blue-700 rounded-full overflow-hidden flex items-center justify-center">
//                 <span className="text-xl font-semibold text-white">
//                   {getInitial(adminData?.email)}
//                 </span>
//               </span>
//               <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
//                 <span className="font-semibold relative right-16">Admin</span>
//                 <span className="text-sm text-gray-600   lowercase truncate max-w-[180px]">
//                   {adminData?.email || "Admin"}
//                 </span>
//               </div>


//               <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="hidden sm:block h-6 w-6 text-gray-300">
//                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>

//             <div className="border-l pl-3 ml-3 space-x-1">
//               <button
//                 onClick={handleLogout}
//                 className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600   focus:bg-gray-100 focus:text-gray-600 rounded-full "
//               >
//                 <span className="sr-only">Log out</span>
//                 <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </header>

//         <main className="p-6 sm:p-10 space-y-6 ">
//           <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
//             <div className="mr-6">
//               <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
//               <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
//             </div>
//             <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
//               <Link to="/dashboard/manage-books" className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
//                 <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//                 Manage Books
//               </Link>
//               <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
//                 <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Add New Book
//               </Link>
//             </div>
//           </div>

//           <Outlet />
//         </main>
//       </div>
//     </section>
//   );
// };

// export default DashboardLayout;


// import React from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const DashboardLayout = () => {
//     const auth = useAuth(); // 👈 Don't destructure yet

//   const { logout, currentUser } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/admin'); // Redirect to admin login after logout
//   };

//   const profileLetter = currentUser?.email?.charAt(0).toUpperCase() || 'A';

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
//         <div className="flex items-center mb-8">
//           <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold mr-3">
//             {profileLetter}
//           </div>
//           <div>
//             <p className="text-sm font-medium">Admin</p>
//             <p className="text-xs text-gray-300">{currentUser?.email}</p>
//           </div>
//         </div>

//         {/* Sidebar Navigation */}
//         <nav className="space-y-2 flex-1">
//           <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Dashboard
//           </Link>
//           <Link to="/dashboard/manage-books" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Manage Books
//           </Link>
//           <Link to="/dashboard/add-book" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Add New Book
//           </Link>
//           <Link to="/dashboard/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Manage Orders
//           </Link>
//           <Link to="/dashboard/users" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Manage Users
//           </Link>
//           <Link to="/dashboard/payment-reports" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Payment Reports
//           </Link>
//         </nav>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700 mt-4"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 overflow-auto">
//         <div className="p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { currentUser } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
    // logout();
    // navigate('/admin'); // Redirect to admin login after logout
  // };

  const profileLetter = currentUser?.email?.charAt(0).toUpperCase() || 'A';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold mr-3">
            {profileLetter}
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-300">{currentUser?.email}</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/dashboard/manage-books" className="block py-2 px-4 rounded hover:bg-gray-700">
            Manage Books
          </Link>
          <Link to="/dashboard/add-book" className="block py-2 px-4 rounded hover:bg-gray-700">
            Add New Book
          </Link>
          <Link to="/dashboard/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
            Manage Orders
          </Link>
          <Link to="/dashboard/users" className="block py-2 px-4 rounded hover:bg-gray-700">
            Manage Users
          </Link>
          <Link to="/dashboard/payment-reports" className="block py-2 px-4 rounded hover:bg-gray-700">
            Payment Reports
          </Link>
        </nav>

        {/* Logout Button */}
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
  );
};

export default DashboardLayout;