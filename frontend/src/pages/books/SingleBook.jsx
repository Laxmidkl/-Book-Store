import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import ReviewForm from '../../components/ReviewForm';
import ReviewsList from '../../components/ReviewsList';
import LikeButton from '../../components/LikeButton';
import RecommendedBooks from '../books/RecommendedBooks';

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [localBook, setLocalBook] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.book) {
      setLocalBook(data.book);
    }
  }, [data]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleReviewSubmit = (updatedBook) => {
    setLocalBook(updatedBook);
    refetch();
  };

  if (isLoading) return <div className="text-center py-8">Loading book details...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading book information</div>;
  if (!localBook) return <div className="text-center py-8">Book not found</div>;

  const imageSrc = localBook.coverImage.startsWith("http")
    ? localBook.coverImage
    : getImgUrl(localBook.coverImage);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-9 ">
      <div className="grid md:grid-cols-2  mb-12">
        <div className=" rounded-lg shadow-md overflow-hidden h-[400px] w-96">
          <img
            src={imageSrc}
            alt={localBook.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          {/* <h1 className="text-3xl font-bold mb-2">{localBook.title}</h1> */}
          
            <h1 className="text-3xl font-bold mb-2">{localBook.title}</h1>
            <p className="text-gray-600 text-lg mb-4">by {localBook.author}</p>
          
          <div className="flex items-center mb-4">
            <LikeButton 
              bookId={localBook._id} 
              initialLikes={localBook.likes?.length || 0} 
              initialLiked={localBook.likes?.some(like => like.userId === localStorage.getItem('uid'))}
            />
          </div>
          
          <div className="mb-6 ">
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> <span className="capitalize">{localBook.category}</span>
            </p>
            <p className="text-2xl font-semibold mb-2">
              Rs.{localBook.newPrice.toFixed(2)}
              {localBook.oldPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  Rs.{localBook.oldPrice.toFixed(2)}
                </span>
              )}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {localBook.description}
            </p>
          </div>
          
          <button 
            onClick={() => handleAddToCart(localBook)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="mb-12">
        <ReviewsList reviews={localBook.reviews || []} />
        <ReviewForm onReviewSubmit={handleReviewSubmit} />
      </div>
      
      <div className="mb-8">
        <RecommendedBooks 
          currentBookId={localBook._id} 
          category={localBook.category} 
        />
      </div>
    </div>
  );
};

export default SingleBook;