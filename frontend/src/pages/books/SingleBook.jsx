import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const {id} = useParams();
    const {data, isLoading, isError} = useFetchBookByIdQuery(id);
const book = data?.book; 
    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happending to load book info</div>

    console.log(book); 


   // Use direct URL if image is from online, otherwise load from local folder
   const imageSrc = book.coverImage.startsWith("http")
     ? book.coverImage
     : getImgUrl(book.coverImage);


  return (
    <div className="max-w-sm shadow-md p-5 m-auto h-full">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                {/* <div>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div> */}


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

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                    <p className="text-gray-700"><strong>Total price:</strong>  Rs. {book?.newPrice}</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
  )
}

export default SingleBook
