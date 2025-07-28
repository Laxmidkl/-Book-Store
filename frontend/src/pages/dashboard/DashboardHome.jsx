


import React, { useEffect, useState } from 'react';
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import StatsCard from './stats/StatsCard';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import SalesChart from './stats/SalesChart';
import Navbar from "../../components/Navbar";

const DashboardHome = () => {
  const { data: ordersData, isLoading: isLoadingOrders, isError, refetch } = useGetAllOrdersQuery();
  const { data: booksData, isLoading: isLoadingBooks } = useFetchAllBooksQuery();

  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
    popularBooks: [],
    monthlySales: []
  });



  useEffect(() => {
    if (ordersData && booksData) {
      const allOrders = Array.isArray(ordersData) ? ordersData : [];
      const allBooks = Array.isArray(booksData?.books) ? booksData.books : [];

      const pendingOrders = allOrders.filter(order =>
        order.paymentStatus !== 'COMPLETE'
      ).length;

      const completedOrders = allOrders.filter(order =>
        order.paymentStatus === 'COMPLETE'
      ).length;

      const totalEarnings = allOrders
        .filter(order => order.paymentStatus === 'COMPLETE')
        .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

      const bookCounts = {};
      allOrders.forEach(order => {
        if (Array.isArray(order.productIds)) {
          order.productIds.forEach(product => {
            if (product._id) {
              bookCounts[product._id] = (bookCounts[product._id] || 0) + 1;
            }
          });
        }
      });

      const popularBooks = Object.entries(bookCounts)
        .map(([id, count]) => {
          const orderWithProduct = allOrders.find(order =>
            order.productIds?.some(p => p._id === id)
          );
          const product = orderWithProduct?.productIds?.find(p => p._id === id);

          return {
            _id: id,
            title: product?.title || 'Unknown Book',
            price: product?.price || 0,
            coverImage: product?.coverImage || '/default-book.png',
            count
          };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);



        // Group earnings by month
const salesByMonth = {};

allOrders
  .filter(order => order.paymentStatus === 'COMPLETE')
  .forEach(order => {
    const date = new Date(order.createdAt);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Jul 2025"

    if (!salesByMonth[month]) {
      salesByMonth[month] = 0;
    }
    salesByMonth[month] += order.totalPrice || 0;
  });

const monthlySales = Object.entries(salesByMonth)
  .map(([month, totalSales]) => ({ month, totalSales }))
  .sort((a, b) => new Date(a.month) - new Date(b.month)); // optional: sort by date






      setStats({
        totalBooks: allBooks.length,
        totalOrders: allOrders.length,
        pendingOrders,
        completedOrders,
        totalEarnings,
        popularBooks,
        monthlySales
      });
    }
  }, [ordersData, booksData]);

  if (isLoadingOrders || isLoadingBooks) return <Loading />;
  if (isError) {
    toast.error('Error loading dashboard data');
    return <div className="text-red-500 p-4">Error loading dashboard data</div>;
  }

  return (
    <>
    <Navbar/>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard icon="📚" title="Total Books" value={stats.totalBooks} color="blue" />
        <StatsCard icon="📦" title="Total Orders" value={stats.totalOrders} color="green" />
        <StatsCard icon="⏳" title="Pending Orders" value={stats.pendingOrders} color="orange" description="Not completed yet" />
        <StatsCard icon="✅" title="Completed Orders" value={stats.completedOrders} color="green" description="All paid orders" />
        <StatsCard icon="💰" title="Total Earnings" value={`Rs. ${stats.totalEarnings.toLocaleString()}`} color="purple" description="From completed orders" />
      </div>

        




{/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
          <SalesChart data={stats.monthlySales} />
        </div>


      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Most Ordered Books</h2>
        {stats.popularBooks.length > 0 ? (
          <div className="space-y-4">
            {stats.popularBooks.map((book, index) => (
              <div key={book._id} className="flex items-center border-b pb-3">
                <span className="text-gray-500 w-8">{index + 1}.</span>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded mr-3"
                  onError={(e) => {
                    e.target.src = '/default-book.png';
                  }}
                />
                <div className="flex-1">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-gray-600">
                    Ordered {book.count} times
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No order data available</p>
        )}
      </div>
    </>
  );
};

export default DashboardHome;
