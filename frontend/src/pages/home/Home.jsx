
import React, { useEffect, useState } from 'react';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import TopSellers from './TopSeller';
import Recommended from './Recommended';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import { getUserPreferences } from '../../utils/userTracking';
import BANNER from './Banner';

const Home = () => {
  const { data: allBooks, isLoading, isError } = useFetchAllBooksQuery();
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    const prefs = getUserPreferences();
    setUserPreferences(prefs);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  return (
    <div className="container mx-auto ">
      <BANNER/>
      <TopSellers />
      <Recommended />
      
      {userPreferences?.likedBooks.length > 0 && (
        <PersonalizedRecommendations 
          likedBooks={userPreferences.likedBooks} 
          allBooks={allBooks} 
        />
      )}
    </div>
  );
};

export default Home;