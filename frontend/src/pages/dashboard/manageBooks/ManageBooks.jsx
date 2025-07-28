import React, { useEffect, useState } from "react";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../../../redux/features/books/booksApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const { data, refetch } = useFetchAllBooksQuery();
  const books = data?.books || [];
  const [deleteBook] = useDeleteBookMutation();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
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
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteBook(id).unwrap();
        Swal.fire("Deleted!", "Book has been deleted.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire("Error", "Failed to delete book.", "error");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Manage Books
          </h2>
        </div>

        {/* Search and Controls Section */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search books..."
                className="block w-full pl-8 sm:pl-10 pr-3 py-1 sm:py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-auto">
              <Link
                to="/dashboard/add-book"
                className="inline-flex items-center justify-center w-full sm:w-auto px-3 sm:px-4 py-1 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cover
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover"
                          src={book.coverImage || "/default-book.png"}
                          alt={book.title}
                          onError={(e) => {
                            e.target.src = "/default-book.png";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">
                        {book.title}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-none">
                        {book.author}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      Rs.{book.newPrice}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium space-x-2 sm:space-x-4">
                      <Link
                        to={`/dashboard/edit-book/${book._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
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
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {searchTerm
                      ? "No books match your search"
                      : "No books found"}
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
