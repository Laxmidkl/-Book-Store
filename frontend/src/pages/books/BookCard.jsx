import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import LikeButton from "../../components/LikeButton";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Use direct URL if image is from online, otherwise load from local folder
  const imageSrc = book.coverImage.startsWith("http")
    ? book.coverImage
    : getImgUrl(book.coverImage);

  return (
    <div className="bg-[#f9f6f6] rounded-xl shadow-md  transition-transform duration-300 hover:shadow-sm hover:scale-103 hover:-translate-y-1 mb-3 mt-3">
      {/* Image */}
      <div>
        <Link to={`/books/${book._id}`}>
          <div className="w-full h-64 overflow-hidden rounded-t-xl">
            <img
              src={imageSrc}
              alt={book?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <Link to={`/books/${book._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 min-h-[60px] ">
            {book?.title}
          </h3>
        </Link>

        {/* Likebutton */}
        <div className="flex items-center mb-4">
          <LikeButton
            bookId={book._id}
            initialLikes={book.likes?.length || 0}
            initialLiked={book.likes?.some(
              (like) => like.userId === localStorage.getItem("uid")
            )}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600  line-clamp-2 ">
          {book?.description.length > 100
            ? `${book.description.slice(0, 100)}...`
            : book?.description}
        </p>

        {/* Price Row */}
        <div className="flex justify-between items-center text-sm mt-2 ">
          <span className="text-green-600 font-bold ">
            Rs. {book?.newPrice}
          </span>
          <span className="text-gray-500 line-through font-bold ">
            Rs. {book?.oldPrice}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(book)}
          className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
