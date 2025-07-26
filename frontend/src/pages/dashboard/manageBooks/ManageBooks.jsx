// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';

// const ManageBooks = () => {
//   const navigate = useNavigate();
//   const { data, refetch, isLoading, error } = useFetchAllBooksQuery();
//   const books = data?.books || []; // match backend { books: [...] }
//   const [deleteBook] = useDeleteBookMutation();

//   const handleDeleteBook = async (id) => {
//     try {
//       await deleteBook(id).unwrap();
//       alert('Book deleted successfully!');
//       refetch();
//     } catch (error) {
//       console.error('Failed to delete book:', error.message);
//       alert('Failed to delete book. Please try again.');
//     }
//   };

//   if (isLoading) return <p>Loading books...</p>;
//   if (error) return <p>Error loading books: {error.toString()}</p>;

//   return (
//     <section className="py-1 bg-blueGray-50">
//       <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
//         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
//           <div className="rounded-t mb-0 px-4 py-3 border-0">
//             <div className="flex flex-wrap items-center">
//               <div className="relative w-full px-4 max-w-full flex-grow flex-1">
//                 <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
//               </div>
//               <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
//                 <button
//                   className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                   type="button"
//                 >
//                   See all
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="block w-full overflow-x-auto">
//             <table className="items-center bg-transparent w-full border-collapse ">
//               <thead>
//                 <tr>
//                   <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                     #
//                   </th>
//                   <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                     Book Title
//                   </th>
//                   <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                     Category
//                   </th>
//                   <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                     Price
//                   </th>
//                   <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {books.length > 0 ? (
//                   books.map((book, index) => (
//                     <tr key={book._id}>
//                       <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
//                         {index + 1}
//                       </th>
//                       <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
//                         {book.title}
//                       </td>
//                       <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                         {book.category}
//                       </td>
//                       <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                         Rs.{book.newPrice}
//                       </td>
//                       <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
//                         <Link
//                           to={`/dashboard/edit-book/${book._id}`}
//                           className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
//                         >
//                           Edit
//                         </Link>
//                         <button
//                           onClick={() => handleDeleteBook(book._id)}
//                           className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4">
//                       No books found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ManageBooks;




import React, { useEffect, useState } from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageBooks = () => {
  const { data, refetch } = useFetchAllBooksQuery();
  const books = data?.books || [];
  const [deleteBook] = useDeleteBookMutation();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on search term
  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.category.toLowerCase().includes(searchLower) ||
      book.author?.toLowerCase().includes(searchLower) ||
      book.isbn?.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteBook = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteBook(id).unwrap();
        Swal.fire('Deleted!', 'Book has been deleted.', 'success');
        refetch();
      }
    } catch (error) {
      console.error('Delete failed:', error);
      Swal.fire('Error', 'Failed to delete book.', 'error');
    }
  };

  // Refetch books when page loads
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
        </div>

        {/* Search and Controls Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title, category, author..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Link
                to="/dashboard/add-book"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add New Book
              </Link>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cover
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={book.coverImage || '/default-book.png'}
                          alt={book.title}
                          onError={(e) => {
                            e.target.src = '/default-book.png';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${book.newPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/dashboard/edit-book/${book._id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm ? 'No books match your search' : 'No books found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;