

import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { query } from 'firebase/firestore';
import { IoSearchOutline } from 'react-icons/io5';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    const { data } = useFetchAllBooksQuery();

    // Defensive: make sure books is an array (adjust 'books' key based on your API)
    const books = data?.books || [];

    const filteredBooks = selectedCategory === "Choose a genre"
        ? books
        : books.filter(book => book.category === selectedCategory.toLowerCase());


    return (
        <div className='py-10 px-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

            {/* category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                    value={selectedCategory}
                >
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            


            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <SwiperSlide key={index}>
                                <BookCard book={book} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p>No books found for the selected category.</p>
                    )
                }
            </Swiper>
        </div>
    )
}

export default TopSellers;
