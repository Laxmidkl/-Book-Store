import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const LikeButton = ({ bookId, initialLikes, initialLiked }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!currentUser) {
      toast.info("Please login to like books");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/books/${bookId}/like`, {
        userId: currentUser.uid,
      });

      //  Log user email, book title, and book ID
      const book = response.data.book;
      console.log(
        `User "${currentUser.email}" ${
          response.data.liked ? "liked" : "removed like from"
        } book "${book.title}" (ID: ${book._id})`
      );

      setLikes(response.data.book.likes.length);
      setLiked(response.data.liked);
      toast.success(response.data.liked ? "Book liked!" : "Like removed");
    } catch (error) {
      console.error("Error liking book:", error);
      toast.error(error.response?.data?.message || "Failed to like book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center space-x-1  text-xl text-red-500 cursor-pointer"
    >
      {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
